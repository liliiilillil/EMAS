package com.moduledemo;

import android.Manifest;
import android.app.Activity;
import android.content.Context;
import android.view.WindowManager;
import android.widget.Toast;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.core.app.ActivityCompat;
import androidx.core.content.ContextCompat;

import com.facebook.react.ReactActivity;
import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.modules.core.PermissionListener;
import com.facebook.react.uimanager.PixelUtil;

import java.util.HashMap;
import java.util.Map;

public class MeasureModule extends ReactContextBaseJavaModule {
    int width;
    int height;

    public MeasureModule(ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @NonNull
    @Override
    public String getName() {
        return "MeasureModule";
    }


    @ReactMethod
    public void showWH() {
        ReactContext context = getReactApplicationContext();
        WindowManager wm = (WindowManager) context.getSystemService(Context.WINDOW_SERVICE);
        width = wm.getDefaultDisplay().getWidth();
        height = wm.getDefaultDisplay().getHeight();
        Toast.makeText(context, "宽为" + width + "高为" + height, Toast.LENGTH_LONG).show();
    }

    @Nullable
    @Override
    public Map<String, Object> getConstants() {
        final Map<String, Object> constants = new HashMap<>();
        constants.put("width", "width");
        constants.put("height", "height");
        return constants;
    }

    @ReactMethod

    public void passKey(Callback errorCallback, Callback successCallback) {
        try {
            successCallback.invoke("123", "456");

        } catch (Exception e) {
            errorCallback.invoke(e.getMessage());
        }
    }

    @ReactMethod
    public void passKeyWithPromise(ReadableMap params, Promise promise) {
        try {
            int a = 0;
            int b = 0;
            if (params.hasKey("a")) {
                a = params.getInt("a");
            }
            if (params.hasKey("b")) {
                b = params.getInt("b");
            }

            WritableMap map = Arguments.createMap();
            map.putDouble("c", 3.0);
            promise.resolve(map);


        } catch (Exception e) {
        }

    }

    @ReactMethod
    public void getPermissoin(Callback errorCallback,Callback successCallback) {
        Activity activity = getCurrentActivity();
        try {
            if(activity != null && activity instanceof ReactActivity){
                ReactActivity currentActivity = (ReactActivity) activity;


                currentActivity.requestPermissions(new String[]{Manifest.permission.ACCESS_FINE_LOCATION}, 2020, new PermissionListener() {
                    @Override
                    public boolean onRequestPermissionsResult(int requestCode, String[] permissions, int[] grantResults) {
                        successCallback.invoke("111");
                        return false;
                    }
                });

            }
        }catch (Exception e){
            errorCallback.invoke(e.getMessage());
        }

    }
}
