package com.terminus.emas;

import android.app.Activity;
import android.content.Context;

import com.alibaba.sdk.android.man.MANHitBuilders;
import com.alibaba.sdk.android.man.MANPageHitBuilder;
import com.alibaba.sdk.android.man.MANService;
import com.alibaba.sdk.android.man.MANServiceProvider;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.bridge.ReadableMapKeySetIterator;
import com.facebook.react.bridge.ReadableType;

import java.util.Map;


public class RNEmasModule extends ReactContextBaseJavaModule {
    private final String MODULE_NAME = "RNEmasModule";
    private final String EVENT_LABEL = "eventLabel";
    private final String EVENT_PROPERTIES = "properties";
    private final String EVENT_PAGE = "eventPage";
    private final String EVENT_DURATION = "eventDuration";

    MANService manService = MANServiceProvider.getService();
    public RNEmasModule(ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @Override
    public String getName() {
        return MODULE_NAME;
    }

    @ReactMethod
    public void onSignUp(String usernick){
        manService.getMANAnalytics().userRegister(usernick);
    }
    @ReactMethod
    public void onLogin(String usernick,String userId){
        manService.getMANAnalytics().updateUserAccount(usernick, userId);
    }
    @ReactMethod
    public void onLogout(){
        manService.getMANAnalytics().updateUserAccount("", "");
    }

//    @ReactMethod
//    public void onPageInfo(String pageName,double number,ReadableMap properties){
//        MANPageHitBuilder pageHitBuilder = new MANPageHitBuilder(pageName);
//        long duration=Double.valueOf(number).longValue();
//        pageHitBuilder.setDurationOnPage(duration);
////        pageHitBuilder.setProperties(properties);
//        pageHitBuilder.build();
//        MANServiceProvider.getService().getMANAnalytics().getDefaultTracker().send(pageHitBuilder.build());
//    }
    @ReactMethod
    public void onPageStart(String pageName){
        manService.getMANPageHitHelper().pageAppear(getCurrentActivity());
    }

    @ReactMethod
    public void onPageEnd(String pageName){
        manService.getMANPageHitHelper().pageDisAppear(getCurrentActivity());
    }

    @ReactMethod
    public void onEvent(ReadableMap args){
        if(args == null) {
            return;
        }
        String eventLabel;
        String eventPage;
        long duration;
        MANHitBuilders.MANCustomHitBuilder hitBuilder=null;

        if(args.hasKey(EVENT_LABEL)) {
            eventLabel = args.getString(EVENT_LABEL);
            hitBuilder = new MANHitBuilders.MANCustomHitBuilder(eventLabel);
        }
        if(args.hasKey(EVENT_PAGE)) {
            eventPage = args.getString(EVENT_PAGE);
            hitBuilder.setEventPage(eventPage);
        }
        if(args.hasKey(EVENT_DURATION)) {
            duration = (long) args.getDouble(EVENT_DURATION);
            hitBuilder.setDurationOnEvent(duration);
        }
        if(args.hasKey(EVENT_PROPERTIES)) {
            ReadableMap map = args.getMap(EVENT_PROPERTIES);
            ReadableMapKeySetIterator iterator = map.keySetIterator();
            while (iterator.hasNextKey()) {
                String key = iterator.nextKey();
                if(map.getType(key) == ReadableType.String) {
                    hitBuilder.setProperty(key, map.getString(key));
                }
            }
        }
        manService.getMANAnalytics().getDefaultTracker().send(hitBuilder.build());
    }
}
