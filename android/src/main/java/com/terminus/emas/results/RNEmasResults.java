package com.terminus.emas.results;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.WritableMap;
import com.terminus.emas.constants.RNEmasConstants;


public class RNEmasResults {

    public static WritableMap formatResultCode() {
        WritableMap result = Arguments.createMap();
        result.putString("success", RNEmasConstants.EmasErrorCode.EmasSuccess);
        return result;
    }
}
