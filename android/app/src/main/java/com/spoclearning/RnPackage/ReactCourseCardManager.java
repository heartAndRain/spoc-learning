package com.spoclearning.RnPackage;

import com.facebook.react.uimanager.SimpleViewManager;
import com.facebook.react.uimanager.ThemedReactContext;
import com.facebook.react.uimanager.annotations.ReactProp;

import javax.annotation.Nullable;

/**
 * Created by lixinyu on 2017/5/10.
 */

public class ReactCourseCardManager extends SimpleViewManager<ReactCourseCard> {
    public final static String REACT_CLASS = "RCTCourseCard";

    @Override
    protected ReactCourseCard createViewInstance(ThemedReactContext reactContext) {
        return new ReactCourseCard(reactContext);
    }

    @Override
    public String getName() {
        return REACT_CLASS;
    }

    @ReactProp(name = "data")
    public void setData(ReactCourseCard view, @Nullable String data) {

    }
}
