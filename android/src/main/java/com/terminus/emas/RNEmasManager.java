package com.terminus.emas;

import android.app.Activity;
import android.app.Application;
import android.content.Context;
import android.content.pm.ApplicationInfo;
import android.content.pm.PackageManager;
import android.os.SystemClock;
import android.util.Log;

import com.alibaba.sdk.android.man.MANHitBuilders;
import com.alibaba.sdk.android.man.MANPageHitBuilder;
import com.alibaba.sdk.android.man.MANService;
import com.alibaba.sdk.android.man.MANServiceProvider;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.bridge.ReadableMapKeySetIterator;
import com.facebook.react.bridge.ReadableType;

import java.util.Stack;


public class RNEmasManager {

    private static String EVENT_LABEL = "eventLabel";
    private static String EVENT_PROPERTIES = "properties";
    private static String EVENT_PAGE = "eventPage";
    private static String EVENT_DURATION = "eventDuration";
    private static String APPKEY_NAME = "EMAS_APPKEY";
    private static String APPSECRET_NAME = "EMAS_APPSECRET";

    MANService manService = MANServiceProvider.getService();
    Stack stack = new Stack();
    private static RNEmasManager instance = null;

    private RNEmasManager (){}
    public static synchronized RNEmasManager getInstance() {
        if(instance == null){
            synchronized (RNEmasManager.class){
                if(instance == null){
                    instance = new RNEmasManager();
                }
            }
        }
        return instance;
    }

    public void init(Application application) {
        if (manService==null){
            return;
        }
        String appKey = getAppKeyFromManifest(application);
        String appSecret = getAppSecretFromManifest(application);
        Context context = application.getApplicationContext();
        manService.getMANAnalytics().init(application, context, appKey, appSecret);
    }

    //是否自动打点
    public void turnOffAutoTrack() {
        if (manService == null) {
            Log.e("error", "ManService=null");
            return;
        }
        manService.getMANAnalytics().turnOffAutoPageTrack();
    }

    //调试日志
    public void turnOnDebug() {
        if (manService == null) {
            Log.e("error", "ManService=null");
            return;
        }
        manService.getMANAnalytics().turnOnDebug();
    }

    //自定义页面信息
    public void onPageInfo(ReadableMap args, Promise promise) {
        if (manService == null) {
            promise.reject(RNEmasConstants.EmasErrorCode.ManServiceNotFound,new Throwable("ManService not found"));
            return;
        }
        if (args == null) {
            promise.reject(RNEmasConstants.EmasErrorCode.ArgsNotFound,new Throwable("error!,args=null!"));
            return;
        }
        String pageName;
        String referPageName;
        long duration;
        MANPageHitBuilder pageHitBuilder;
        if (args.hasKey("pageName")) {
            pageName = args.getString("pageName");
            pageHitBuilder = new MANPageHitBuilder(pageName);
        } else {
            promise.reject(RNEmasConstants.EmasErrorCode.PageNameNotFound,new Throwable("error!,pageName=null!"));
            return;
        }
        if (args.hasKey("referPageName")) {
            referPageName = args.getString("referPageName");
            pageHitBuilder.setReferPage(referPageName);
        }
        if (args.hasKey("duration")) {
            duration = (long) args.getDouble("duration");
            pageHitBuilder.setDurationOnPage(duration);
        }
        if (args.hasKey("properties")) {
            ReadableMap map = args.getMap("properties");
            ReadableMapKeySetIterator iterator = map.keySetIterator();
            while (iterator.hasNextKey()) {
                String key = iterator.nextKey();
                if (map.getType(key) == ReadableType.String) {
                    pageHitBuilder.setProperty(key, map.getString(key));
                }
            }
        }
        manService.getMANAnalytics().getDefaultTracker().send(pageHitBuilder.build());
        promise.resolve("pageInfo send succeed!");
    }

    //自定义事件
    public void onEvent(ReadableMap args, Promise promise) {
        if (manService == null) {
            promise.reject(RNEmasConstants.EmasErrorCode.ManServiceNotFound,new Throwable("ManService not found"));
            return;
        }
        if (args == null) {
            promise.reject(RNEmasConstants.EmasErrorCode.ArgsNotFound,new Throwable("error!,args=null!"));
            return;
        }
        String eventLabel;
        String eventPage;
        long duration;
        MANHitBuilders.MANCustomHitBuilder hitBuilder;
        if (args.hasKey(EVENT_LABEL)) {
            eventLabel = args.getString(EVENT_LABEL);
            hitBuilder = new MANHitBuilders.MANCustomHitBuilder(eventLabel);
        } else {
            promise.reject(RNEmasConstants.EmasErrorCode.EventLabelNotFound,new Throwable("error!,eventLabel=null!"));
            return;
        }
        if (args.hasKey(EVENT_PAGE)) {
            eventPage = args.getString(EVENT_PAGE);
            hitBuilder.setEventPage(eventPage);
        }
        if (args.hasKey(EVENT_DURATION)) {
            duration = (long) args.getDouble(EVENT_DURATION);
            hitBuilder.setDurationOnEvent(duration);
        }
        if (args.hasKey(EVENT_PROPERTIES)) {
            ReadableMap map = args.getMap(EVENT_PROPERTIES);
            ReadableMapKeySetIterator iterator = map.keySetIterator();
            while (iterator.hasNextKey()) {
                String key = iterator.nextKey();
                if (map.getType(key) == ReadableType.String) {
                    hitBuilder.setProperty(key, map.getString(key));
                }
            }
        }
        manService.getMANAnalytics().getDefaultTracker().send(hitBuilder.build());
        promise.resolve("custom event send succeed!");
    }

    //页面开始
    public synchronized void onPageStart(String pageName, Promise promise) {
        if (manService == null) {
            promise.reject(RNEmasConstants.EmasErrorCode.ManServiceNotFound,new Throwable("ManService not found"));
            return;
        }
        if (pageName == null) {
            return;
        }
        long startMilliSeconds = SystemClock.elapsedRealtime();
        PageInfo p = new PageInfo();
        p.setPageName(pageName);
        p.setTime(startMilliSeconds);
        doStack("push", p);
        promise.resolve("page start!");
    }

    //页面结束
    public synchronized void onPageEnd(ReadableMap args, Promise promise) {
        if (manService == null) {
            promise.reject(RNEmasConstants.EmasErrorCode.ManServiceNotFound,new Throwable("ManService not found"));
            return;
        }
        String pageName;
        if (args.hasKey("pageName")) {
            pageName = args.getString("pageName");
        }else{
            promise.reject(RNEmasConstants.EmasErrorCode.PageNameNotFound,new Throwable("pageName=null"));
            return;
        }
        if (stack.size() == 0) {
            promise.reject(RNEmasConstants.EmasErrorCode.FrontPageNotFound,new Throwable("please use onPageStart first"));  //空栈说明未调用onPageStart
            return;
        }
        PageInfo p = doStack("peek", null);                  //获取栈顶信息
        if (p.getPageName().equals(pageName)) {                              //栈顶page匹配
            MANPageHitBuilder pageHitBuilder = new MANPageHitBuilder(pageName);
            long endMilliSeconds = SystemClock.elapsedRealtime();
            long startMilliSeconds = p.getTime();
            doStack("pop", null);                           //出栈
            long duration = (endMilliSeconds - startMilliSeconds) / 1000;   //与ios统一故以秒为单位
            String referPageName;
            if (args.hasKey("referPageName")) {
                referPageName = args.getString("referPageName");
            }else{
                if (stack.size() != 0) {                                    //栈顶出栈后栈不为空则说明有来源页面
                    PageInfo nowInfo = doStack("peek", null);
                    referPageName = nowInfo.getPageName();
                } else {
                    referPageName = null;
                }
            }
            if (args.hasKey("properties")) {
                ReadableMap map = args.getMap("properties");
                ReadableMapKeySetIterator iterator = map.keySetIterator();
                while (iterator.hasNextKey()) {
                    String key = iterator.nextKey();
                    if (map.getType(key) == ReadableType.String) {
                        pageHitBuilder.setProperty(key, map.getString(key));
                    }
                }
            }
            pageHitBuilder.setDurationOnPage(duration);
            pageHitBuilder.setReferPage(referPageName);
            manService.getMANAnalytics().getDefaultTracker().send(pageHitBuilder.build());
            promise.resolve("page end!");
        } else {
            promise.reject(RNEmasConstants.EmasErrorCode.PageNameDoesnotMatch,new Throwable("pageName doesn't match"));
            return;
        }
    }

    public void onPause(Activity activity) {
        if (manService == null) {
            Log.e("error", "ManService=null");
            return;
        }
        manService.getMANPageHitHelper().pageDisAppear(activity);
    }

    public void onResume(Activity activity) {
        if (manService == null) {
            Log.e("error", "ManService=null");
            return;
        }
        manService.getMANPageHitHelper().pageAppear(activity);
    }

    //对栈操作
    private synchronized PageInfo doStack(String doWhat, PageInfo p) {
        switch (doWhat){
            case "push":
                stack.push(p);
                return null;
            case "pop":
                stack.pop();
                return null;
            case "peek":
                return (PageInfo) stack.peek();
            default:
                return null;
        }
    }

    private String getAppKeyFromManifest(Application application) {
        try {
            ApplicationInfo applicationInfo = application.getPackageManager().getApplicationInfo(application.getPackageName(), PackageManager.GET_META_DATA);
            return applicationInfo.metaData.getString(APPKEY_NAME);
        } catch (Throwable e) {
            //e.printStackTrace();
        }
        return null;
    }

    private String getAppSecretFromManifest(Application application) {
        try {
            ApplicationInfo applicationInfo = application.getPackageManager().getApplicationInfo(application.getPackageName(), PackageManager.GET_META_DATA);
            return applicationInfo.metaData.getString(APPSECRET_NAME);
        } catch (Throwable e) {
            //e.printStackTrace();
        }
        return null;
    }

}
