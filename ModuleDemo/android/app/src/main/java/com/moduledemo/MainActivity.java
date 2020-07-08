package com.moduledemo;

import android.Manifest;
import android.app.Activity;
import android.widget.Toast;

import androidx.annotation.IntRange;
import androidx.annotation.NonNull;
import androidx.core.app.ActivityCompat;
import androidx.core.content.ContextCompat;

import com.facebook.react.PackageList;
import com.facebook.react.ReactActivity;
import com.facebook.react.ReactPackage;

public class MainActivity extends ReactActivity {

  @Override
  protected String getMainComponentName() {
    return "ModuleDemo";
  }

}


