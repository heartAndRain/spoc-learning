package com.spoclearning;

import android.app.Activity;

import com.brentvatne.react.ReactVideoPackage;
//import com.horcrux.svg.SvgPackage;
import com.imagepicker.ImagePickerPackage;
import com.facebook.react.ReactPackage;
import com.yoloci.fileupload.FileUploadPackage;
import com.filepicker.FilePickerPackage;

import com.reactnativenavigation.NavigationApplication;

import java.util.Arrays;
import java.util.List;

public class MainApplication extends NavigationApplication {

  @Override
  public boolean isDebug() {
    // Make sure you are using BuildConfig from your own application
    return BuildConfig.DEBUG;
  }

  protected List<ReactPackage> getPackages() {
    // Add additional packages you require here
    // No need to add RnnPackage and MainReactPackage
    return Arrays.<ReactPackage>asList(
            // eg. new VectorIconsPackage()
            new ReactVideoPackage(),
//            new SvgPackage(),
            new ImagePickerPackage(),
            new FilePickerPackage(),
            new FileUploadPackage()
    );
  }

  @Override
  public List<ReactPackage> createAdditionalReactPackages() {
    return getPackages();
  }
}