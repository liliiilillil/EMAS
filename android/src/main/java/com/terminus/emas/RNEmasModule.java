package com.terminus.emas;


import com.alibaba.sdk.android.man.MANService;
import com.alibaba.sdk.android.man.MANServiceProvider;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReadableMap;


public class RNEmasModule extends ReactContextBaseJavaModule {
    private final String MODULE_NAME = "RNEmasModule";

    MANService manService = MANServiceProvider.getService();

    public RNEmasModule(ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @Override
    public String getName() {
        return MODULE_NAME;
    }

    @ReactMethod
    public void onSignUp(String usernick, Promise promise) {
        if (usernick == null) {
            promise.reject(new Throwable("error!,userNick=null!"));
            return;
        }
        manService.getMANAnalytics().userRegister(usernick);
    }

    @ReactMethod
    public void onLogin(String userNick, String userId, Promise promise) {
        if (userId == null || userNick == null) {
            promise.reject(new Throwable("error!,userNick=null||userId=null!"));
            return;
        }
        manService.getMANAnalytics().updateUserAccount(userNick, userId);
    }

    @ReactMethod
    public void onLogout() {
        manService.getMANAnalytics().updateUserAccount("", "");
    }

    @ReactMethod
    public void onPageStart(String pageName,Promise promise) {
        RNEmasManager.onPageStart(pageName,promise);
    }

    @ReactMethod
    public void onPageEnd(String pageName, Promise promise) {
        RNEmasManager.onPageEnd(pageName, promise);
    }

    @ReactMethod
    public void onPageInfo(ReadableMap args, Promise promise) {
        RNEmasManager.onPageInfo(args, promise);
    }


    @ReactMethod
    public void onEvent(ReadableMap args, Promise promise) {
        RNEmasManager.onEvent(args, promise);
    }
}
