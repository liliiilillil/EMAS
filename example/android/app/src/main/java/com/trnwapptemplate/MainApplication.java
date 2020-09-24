package com.trnwapptemplate;

import android.app.Application;
import android.content.Context;
import androidx.multidex.MultiDex;

import com.facebook.react.ReactApplication;
import com.swmansion.rnscreens.RNScreensPackage;
import com.swmansion.reanimated.ReanimatedPackage;
import com.reactnativecommunity.webview.RNCWebViewPackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;
import com.horcrux.svg.SvgPackage;
import com.imagepicker.ImagePickerPackage;
import com.psykar.cookiemanager.CookieManagerPackage;
import com.swmansion.gesturehandler.react.RNGestureHandlerPackage;
import io.terminus.screen.ScreenInfoReactPackage;
import com.lwansbrough.RCTCamera.RCTCameraPackage;
import com.reactnativecommunity.netinfo.NetInfoPackage;

import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;
import java.util.Arrays;
import java.util.List;

import com.env.RNEnvPackage;
import com.terminus.emas.RNEmasManager;
import com.terminus.emas.RNEmasPackage;

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
              new RNScreensPackage(),
              new ReanimatedPackage(),
              new RNCWebViewPackage(),
              new SvgPackage(),
              new ImagePickerPackage(),
              new CookieManagerPackage(),
              new RCTCameraPackage(),
              new NetInfoPackage(),
              new RNGestureHandlerPackage(),
              new RNEnvPackage(),
              new ScreenInfoReactPackage(),
             new RNEmasPackage()
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
    initializeFlipper(this); // Remove this line if you don't want Flipper enabled
    debugToolInit();

    RNEmasManager.turnOffAutoTrack();
    RNEmasManager.turnOnDebug();
    RNEmasManager.init(this);
  }

  @Override
  protected void attachBaseContext(Context base) {
    super.attachBaseContext(base);
    MultiDex.install(this);
  }

  /**
   * Loads Flipper in React Native templates.
   *
   * @param context
   */
  private static void initializeFlipper(Context context) {
    if (BuildConfig.DEBUG) {
      try {
        /*
         We use reflection here to pick up the class that initializes Flipper,
        since Flipper library is not available in release mode
        */
        Class<?> aClass = Class.forName("com.facebook.flipper.ReactNativeFlipper");
        aClass.getMethod("initializeFlipper", Context.class).invoke(null, context);
      } catch (ClassNotFoundException e) {
        e.printStackTrace();
      } catch (NoSuchMethodException e) {
        e.printStackTrace();
      } catch (IllegalAccessException e) {
        e.printStackTrace();
      } catch (InvocationTargetException e) {
        e.printStackTrace();
      }
    }
  }

  private void debugToolInit(){
    try {
      Class<?> debugClass = Class.forName("com.debug.RNDebugManager");
      Method initFunc = debugClass.getMethod("init", Application.class);
      initFunc.invoke(this,this);
    } catch (Exception e) {
      e.printStackTrace();
    }
  }
}
