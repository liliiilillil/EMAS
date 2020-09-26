package com.trnwapptemplate;

import android.os.Bundle;
import android.view.WindowManager;
import android.widget.Toast;

import com.facebook.react.ReactActivity;
import io.terminus.screen.utils.ScreenUtils;

import com.env.EnvSwitchConfig;
import com.terminus.emas.RNEmasManager;
import com.trnwapptemplate.utils.CrashUtil;
import com.trnwapptemplate.utils.NetInfoHandler;
import com.trnwapptemplate.utils.NetInfoUtil;
import com.trnwapptemplate.utils.RootUtil;

import com.facebook.react.ReactActivityDelegate;
import com.facebook.react.ReactRootView;
import com.swmansion.gesturehandler.react.RNGestureHandlerEnabledRootView;


public class MainActivity extends ReactActivity {

    private NetInfoHandler mNetInfoHandler;

    public MainActivity() {
        super();
    }

    /**
     * Returns the name of the main component registered from JavaScript.
     * This is used to schedule rendering of the component.
     */
    @Override
    protected String getMainComponentName() {
        return "TRNWAppTemplate";
    }

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        EnvSwitchConfig.shareInstance().initActivity(this);
        EnvSwitchConfig.shareInstance().setCanSwitchInRelease(BuildConfig.env == 2);
        ScreenUtils.statusBarTransparent(getWindow());
        appEnvCheck();
    }

    private void appEnvCheck(){
        if(!BuildConfig.NEED_ENV_CHECK) {
            return;
        }
        if(RootUtil.isRooted()) {
            Toast.makeText(this, "当前环境为root环境，请谨慎使用app", Toast.LENGTH_SHORT).show();
        }
        if(NetInfoUtil.isVpnUsed() || NetInfoUtil.isWifiProxy(this)) {
            Toast.makeText(this, "检测到当前网络使用代理，请谨慎使用app", Toast.LENGTH_SHORT).show();
        }
        if(getWindow() != null) {
            getWindow().addFlags(WindowManager.LayoutParams.FLAG_SECURE);
        }
        CrashUtil.crashHandler();
        mNetInfoHandler = new NetInfoHandler(this);
    }

    @Override
    protected void onResume() {
        super.onResume();
        RNEmasManager.getInstance().onResume(this);
    }

    @Override
    protected void onPause() {
        super.onPause();
        RNEmasManager.getInstance().onPause(this);
    }

    @Override
    protected void onDestroy() {
        if(mNetInfoHandler != null) {
            mNetInfoHandler.onDestory(this);
        }
        super.onDestroy();
    }

    @Override
  protected ReactActivityDelegate createReactActivityDelegate() {
    return new ReactActivityDelegate(this, getMainComponentName()) {
      @Override
      protected ReactRootView createRootView() {
        return new RNGestureHandlerEnabledRootView(MainActivity.this);
      }
    };
  }
}
