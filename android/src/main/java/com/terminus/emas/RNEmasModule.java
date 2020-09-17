package com.terminus.emas;

import com.alibaba.sdk.android.man.MANHitBuilders;
import com.alibaba.sdk.android.man.MANService;
import com.alibaba.sdk.android.man.MANServiceProvider;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.bridge.ReadableMapKeySetIterator;
import com.facebook.react.bridge.ReadableType;


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
    public void onPageStart() {
        manService.getMANPageHitHelper().pageAppear(getCurrentActivity());
    }

    @ReactMethod
    public void onPageEnd() {
        manService.getMANPageHitHelper().pageDisAppear(getCurrentActivity());
    }

    @ReactMethod
    public void onEvent(ReadableMap args, Promise promise) {
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
}
