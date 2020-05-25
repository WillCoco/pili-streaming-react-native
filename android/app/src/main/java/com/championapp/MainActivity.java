package com.championapp;

import android.os.Bundle;

import com.facebook.react.ReactActivity;
import com.facebook.react.ReactRootView;

// import expo.modules.splashscreen.SplashScreen;
// import expo.modules.splashscreen.SplashScreenImageResizeMode;
import org.devio.rn.splashscreen.SplashScreen; // here

public class MainActivity extends ReactActivity {
  @Override
  protected void onCreate(Bundle savedInstanceState) {
    SplashScreen.show(this);
    super.onCreate(savedInstanceState);
    // SplashScreen.show(...) has to be called after super.onCreate(...)
    // Below line is handled by '@expo/configure-splash-screen' command and it's discouraged to modify it manually
    // SplashScreen.show(this, SplashScreenImageResizeMode.CONTAIN, ReactRootView.class);
  }


  /**
   * Returns the name of the main component registered from JavaScript. This is used to schedule
   * rendering of the component.
   */
  @Override
  protected String getMainComponentName() {
    return "championApp";
  }
}
