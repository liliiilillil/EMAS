package com.terminus.emas;

import android.app.Activity;
import android.app.Application;
import android.content.Context;
import android.content.pm.ApplicationInfo;
import android.content.pm.PackageManager;

import com.alibaba.sdk.android.man.MANService;
import com.alibaba.sdk.android.man.MANServiceProvider;


public class RNEmasManager {

    private static String APPKEY_NAME = "EMAS_APPKEY";
    private static String APPSECRET_NAME = "EMAS_APPSECRET";

    public static void init(Application application) {
        MANService manService = MANServiceProvider.getService();
        String appKey=getAppKeyFromManifest(application);
        String appSecret=getAppSecretFromManifest(application);
        Context context=application.getApplicationContext();
        manService.getMANAnalytics().init(application, context, appKey, appSecret);
    }

    //是否自动打点
    public static void setAutoTrack(boolean auto) {
        MANService manService = MANServiceProvider.getService();
        if (!auto) {
            manService.getMANAnalytics().turnOffAutoPageTrack();
        }
    }

    //调试日志
    public static void setOnDebug(boolean turn) {
        MANService manService = MANServiceProvider.getService();
        if (turn) {
            manService.getMANAnalytics().turnOnDebug();
        }
    }

    //设置渠道
    public static void setChannel(String channel) {
        MANService manService = MANServiceProvider.getService();
        manService.getMANAnalytics().setChannel(channel);
    }

    //设置appVersion
    public static void setAppVersion(String version) {
        MANService manService = MANServiceProvider.getService();
        manService.getMANAnalytics().setAppVersion(version);
    }

    public static void onPause(Activity activity) {
        MANService manService = MANServiceProvider.getService();
        manService.getMANPageHitHelper().pageDisAppear(activity);
    }

    public static void onResume(Activity activity) {
        MANService manService = MANServiceProvider.getService();
        manService.getMANPageHitHelper().pageAppear(activity);
    }
    private static String getAppKeyFromManifest(Application application){
        try{
            ApplicationInfo applicationInfo = application.getPackageManager().getApplicationInfo(application.getPackageName(), PackageManager.GET_META_DATA);
            return applicationInfo.metaData.getString(APPKEY_NAME);
        }catch (Throwable e) {
            //e.printStackTrace();
        }
        return null;
    }

    private static String getAppSecretFromManifest(Application application){
        try{
            ApplicationInfo applicationInfo = application.getPackageManager().getApplicationInfo(application.getPackageName(), PackageManager.GET_META_DATA);
            return applicationInfo.metaData.getString(APPSECRET_NAME);
        }catch (Throwable e) {
            //e.printStackTrace();
        }
        return null;
    }

}
