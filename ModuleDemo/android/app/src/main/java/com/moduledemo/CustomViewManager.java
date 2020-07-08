package com.moduledemo;

import android.graphics.Color;
import android.util.Log;
import android.view.View;

import androidx.annotation.NonNull;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.module.annotations.ReactModule;
import com.facebook.react.uimanager.SimpleViewManager;
import com.facebook.react.uimanager.ThemedReactContext;
import com.facebook.react.uimanager.annotations.ReactProp;
import com.facebook.react.uimanager.events.RCTEventEmitter;

@ReactModule(name=CustomViewManager.REACT_CLASS)
public class CustomViewManager extends SimpleViewManager {

    protected static final String REACT_CLASS="RCTCustomView";
    @NonNull
    @Override
    public String getName() {
        return REACT_CLASS;
    }

    @NonNull
    @Override
    protected View createViewInstance(@NonNull ThemedReactContext reactContext) {
        final  View customView=new View(reactContext);
        customView.setBackgroundColor(Color.parseColor("#ff4c48"));

        customView.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                WritableMap map= Arguments.createMap();
                map.putInt("int_value",10086);
                reactContext.getJSModule(RCTEventEmitter.class).receiveEvent(customView.getId(),"TopChange",map);
            }
        });


        return customView;
    }


    @ReactProp(name="testData")
        public void setTestData(View view, ReadableMap testData){
        Log.v("ReactNativeJS",testData+"");
    }



}
