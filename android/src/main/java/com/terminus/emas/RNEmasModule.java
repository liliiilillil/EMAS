package com.terminus.emas;

import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReadableMap;


public class RNEmasModule extends ReactContextBaseJavaModule {
    private final String MODULE_NAME = "RNEmasModule";

    public RNEmasModule(ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @Override
    public String getName() {
        return MODULE_NAME;
    }

    @ReactMethod
    public void onSignUp(String userNick, Promise promise) {
        if (userNick == null) {
            promise.reject(RNEmasConstants.EmasErrorCode.UserInfoNotFound,new Throwable("error!,userNick=null!"));
            return;
        }
        if (RNEmasManager.getInstance().manService==null){
            promise.reject(RNEmasConstants.EmasErrorCode.ManServiceNotFound,new Throwable("ManService not found!"));
        }
        RNEmasManager.getInstance().manService.getMANAnalytics().userRegister(userNick);
        promise.resolve("sign up succeed!");
    }

    @ReactMethod
    public void onLogin(String userNick, String userId, Promise promise) {
        if (userId == null || userNick == null) {
            promise.reject(RNEmasConstants.EmasErrorCode.UserInfoNotFound,new Throwable("error!,userNick=null||userId=null!"));
            return;
        }
        if (RNEmasManager.getInstance().manService==null){
            promise.reject(RNEmasConstants.EmasErrorCode.ManServiceNotFound,new Throwable("ManService not found!"));
        }
        RNEmasManager.getInstance().manService.getMANAnalytics().updateUserAccount(userNick, userId);
        promise.resolve("login succeed!");
    }

    @ReactMethod
    public void onLogout(Promise promise) {
        if (RNEmasManager.getInstance().manService==null){
            promise.reject(RNEmasConstants.EmasErrorCode.ManServiceNotFound,new Throwable("ManService not found!"));
        }
        RNEmasManager.getInstance().manService.getMANAnalytics().updateUserAccount("", "");
        promise.resolve("logout succeed!");
    }

    @ReactMethod
    public void onPageStart(String pageName, Promise promise) {
        RNEmasManager.getInstance().onPageStart(pageName, promise);
    }

    @ReactMethod
    public void onPageEnd(ReadableMap args, Promise promise) {
        RNEmasManager.getInstance().onPageEnd(args, promise);
    }

    @ReactMethod
    public void onPageInfo(ReadableMap args, Promise promise) {
        RNEmasManager.getInstance().onPageInfo(args, promise);
    }

    @ReactMethod
    public void onEvent(ReadableMap args, Promise promise) {
        RNEmasManager.getInstance().onEvent(args, promise);
    }
}
