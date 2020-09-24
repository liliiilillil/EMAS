package com.terminus.emas;

import android.app.Activity;
import android.app.Application;
import android.content.Context;
import android.content.pm.ApplicationInfo;
import android.content.pm.PackageManager;
import android.os.SystemClock;

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

    static MANService manService = MANServiceProvider.getService();
    static Stack stack = new Stack();

    static class pageInfo {
        String pageName;
        long time;
    }

    public static void init(Application application) {
        String appKey = getAppKeyFromManifest(application);
        String appSecret = getAppSecretFromManifest(application);
        Context context = application.getApplicationContext();
        manService.getMANAnalytics().init(application, context, appKey, appSecret);
    }

    //是否自动打点
    public static void turnOffAutoTrack() {
        manService.getMANAnalytics().turnOffAutoPageTrack();
    }

    //调试日志
    public static void turnOnDebug() {
        manService.getMANAnalytics().turnOnDebug();
    }

    //自定义页面信息
    public static void onPageInfo(ReadableMap args, Promise promise) {
        if (args == null) {
            promise.reject(new Throwable("error!,args=null!"));
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
            promise.reject(new Throwable("error!,pageName=null!"));
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
        pageHitBuilder.build();
        manService.getMANAnalytics().getDefaultTracker().send(pageHitBuilder.build());
    }

    //自定义事件
    public static void onEvent(ReadableMap args, Promise promise) {
        if (args == null) {
            promise.reject(new Throwable("error!,args=null!"));
            return;
        }
        String eventLabel;
        String eventPage;
        long duration;
        MANHitBuilders.MANCustomHitBuilder hitBuilder = null;
        if (args.hasKey(EVENT_LABEL)) {
            eventLabel = args.getString(EVENT_LABEL);
            hitBuilder = new MANHitBuilders.MANCustomHitBuilder(eventLabel);
        } else {
            promise.reject(new Throwable("error!,eventLabel=null!"));
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
    }

    //页面开始
    public static synchronized void onPageStart(String pageName) {
        if (pageName == null) {
            return;
        }
        long startMilliSeconds = SystemClock.elapsedRealtime();
        pageInfo p = new pageInfo();
        p.pageName = pageName;
        p.time = startMilliSeconds;
        stack.push(p);
    }

    //页面结束
    public static synchronized void onPageEnd(String pageName, Promise promise) {
        if (pageName == null) {
            promise.reject(new Throwable("pageName==null"));
            return;
        }
        if (stack.size() == 0) {
            promise.reject(new Throwable("didn't use onPageStart func!"));
            return;
        }
        pageInfo p = (pageInfo) stack.peek();
        if (p.pageName.equals(pageName)) {
            stack.pop();
            long endMilliSeconds = SystemClock.elapsedRealtime();
            long startMilliSeconds = p.time;
            long duration = (endMilliSeconds - startMilliSeconds) / 1000;
            MANPageHitBuilder pageHitBuilder;
            pageHitBuilder = new MANPageHitBuilder(pageName);
            String referPageName;
            if (stack.size() != 0) {
                referPageName = p.pageName;
            } else {
                referPageName = null;
            }
            pageHitBuilder.setReferPage(referPageName);
            pageHitBuilder.setDurationOnPage(duration);
            pageHitBuilder.build();
            manService.getMANAnalytics().getDefaultTracker().send(pageHitBuilder.build());
        } else {
            promise.reject("pageName doesn't match");
            return;
        }
    }

    public static void onPause(Activity activity) {
        manService.getMANPageHitHelper().pageDisAppear(activity);
    }

    public static void onResume(Activity activity) {
        manService.getMANPageHitHelper().pageAppear(activity);
    }

    private static String getAppKeyFromManifest(Application application) {
        try {
            ApplicationInfo applicationInfo = application.getPackageManager().getApplicationInfo(application.getPackageName(), PackageManager.GET_META_DATA);
            return applicationInfo.metaData.getString(APPKEY_NAME);
        } catch (Throwable e) {
            //e.printStackTrace();
        }
        return null;
    }

    private static String getAppSecretFromManifest(Application application) {
        try {
            ApplicationInfo applicationInfo = application.getPackageManager().getApplicationInfo(application.getPackageName(), PackageManager.GET_META_DATA);
            return applicationInfo.metaData.getString(APPSECRET_NAME);
        } catch (Throwable e) {
            //e.printStackTrace();
        }
        return null;
    }

}
