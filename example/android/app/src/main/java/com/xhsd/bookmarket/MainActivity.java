package com.xhsd.bookmarket;

import android.content.Intent;
import android.os.Bundle;
import android.view.WindowManager;
import android.widget.Toast;

import com.facebook.react.ReactActivity;
import com.terminus.social.base.PlatformConfig;
import com.xhsd.bookmarket.launcher.IJSBundle;
import com.xhsd.bookmarket.launcher.LauncherDelegate;
import io.terminus.screen.utils.ScreenUtils;

import com.env.EnvSwitchConfig;
import com.xhsd.bookmarket.utils.CrashUtil;
import com.xhsd.bookmarket.utils.NetInfoHandler;
import com.xhsd.bookmarket.utils.NetInfoUtil;
import com.xhsd.bookmarket.utils.RootUtil;


public class MainActivity extends ReactActivity implements IJSBundle{

    private LauncherDelegate mLauncherDelegate;
    private NetInfoHandler mNetInfoHandler;

    public MainActivity() {
        super();
        mLauncherDelegate = new LauncherDelegate(this,this);
    }

    /**
     * Returns the name of the main component registered from JavaScript.
     * This is used to schedule rendering of the component.
     */
    @Override
    protected String getMainComponentName() {
        return "social";
    }

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        //mLauncherDelegate.showLaunchImageDialog(this);
        super.onCreate(savedInstanceState);
        mLauncherDelegate.onCreate();
        EnvSwitchConfig.shareInstance().initActivity(this);
        EnvSwitchConfig.shareInstance().setCanSwitchInRelease(BuildConfig.env == 2);
        ScreenUtils.statusBarTransparent(getWindow());
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
    }


    @Override
    protected void onDestroy() {
        if(mNetInfoHandler != null) {
            mNetInfoHandler.onDestory(this);
        }
        super.onDestroy();
        mLauncherDelegate.onDestroy();
    }

    @Override
    public void onBundleLoadFinish() {

    }

    @Override
    public void onActivityResult(int requestCode, int resultCode, Intent data) {
        super.onActivityResult(requestCode, resultCode, data);
        PlatformConfig.getInstance().onActivityResult(requestCode,resultCode,data);
    }
}
