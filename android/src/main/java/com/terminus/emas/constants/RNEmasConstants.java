package com.terminus.emas.constants;

public class RNEmasConstants {

    public interface EmasErrorCode {
        public String EmasSuccess                      = "0";         // 成功
        public String ManServiceNotFound               = "10001";     // manService获取失败
        public String ArgsNotFound                     = "10002";     // 传入参数为空
        public String PageNameNotFound                 = "10003";     // pageName未传入
        public String EventLabelNotFound               = "10004";     // eventLabel未传入
        public String FrontPageNotFound                = "10005";     // 未调用onPageStart
        public String PageNameDoesnotMatch             = "10006";     // pageName不对应
        public String UserInfoNotFound                 = "10007";     // 用户参数传入错误
        public String EmasUnknownError                 = "10000";     // 未知错误
    }
}
