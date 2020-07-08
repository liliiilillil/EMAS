package com.xhsd.bookmarket;

import android.app.Application;
import android.content.Context;
import android.support.multidex.MultiDex;

import com.facebook.react.ReactApplication;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;
import com.horcrux.svg.SvgPackage;
import com.imagepicker.ImagePickerPackage;
import com.psykar.cookiemanager.CookieManagerPackage;
import com.terminus.social.ReactNativeSocialPackage;
import com.terminus.social.base.PlatformConfig;
import com.terminus.social.base.SOCIAL_MEDIA;
import com.trnwtoast.module.TRNWToastPackage;
import com.swmansion.gesturehandler.react.RNGestureHandlerPackage;
import io.terminus.screen.ScreenInfoReactPackage;
import com.lwansbrough.RCTCamera.RCTCameraPackage;
import com.oblongmana.webviewfileuploadandroid.AndroidWebViewPackage;

import java.lang.reflect.Method;
import java.util.Arrays;
import java.util.List;

import com.env.RNEnvPackage;

public class MainApplication extends Application implements ReactApplication {

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    public boolean getUseDeveloperSupport() {
      if (BuildConfig.DEBUG) {
        return !BuildConfig.LOAD_LOCAL_BUNDLE;
      }
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {

     List<ReactPackage> reactPackages  = Arrays.<ReactPackage>asList(
              new MainReactPackage(),
              new SvgPackage(),
              new ImagePickerPackage(),
              new CookieManagerPackage(),
              new RCTCameraPackage(),
              new RNGestureHandlerPackage(),
              new RNEnvPackage(),
              new TRNWToastPackage(),
              new ScreenInfoReactPackage(),
              new AndroidWebViewPackage(),
              new ReactNativeSocialPackage()
      );


      try {
        Class<?> debugClass = Class.forName("com.debug.RNDebugPackage");
        ReactPackage debugPackage = (ReactPackage)debugClass.newInstance();
        reactPackages.add(debugPackage);
      } catch (Exception e) {
        e.printStackTrace();
      }
      
      return reactPackages;
    }

    @Override
    protected String getJSMainModuleName() {
      return "index";
    }
  };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
    super.onCreate();
    SoLoader.init(this, /* native exopackage */ false);
    try {
	    Class<?> debugClass = Class.forName("com.debug.RNDebugManager");
	    Method initFunc = debugClass.getMethod("init", Application.class);
	    initFunc.invoke(this,this);
	  } catch (Exception e) {
	    e.printStackTrace();
	  }
    initSocial();
  }

  private void initSocial(){
    PlatformConfig.getInstance().init(this);
    PlatformConfig.getInstance().addChannel(SOCIAL_MEDIA.WECHAT,"wxe8a0611546ab4b43","4d9acc6d2aa247face14495c663e3c5f");
    PlatformConfig.getInstance().addChannel(SOCIAL_MEDIA.QQ, "1106536970","XkFaRx1YuXlkJIpw");
    PlatformConfig.getInstance().addChannel(SOCIAL_MEDIA.SINA,"2632552909");
  }

  @Override
  protected void attachBaseContext(Context base) {
    super.attachBaseContext(base);
    MultiDex.install(this);
  }
}
