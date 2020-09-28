#import <React/RCTBridgeModule.h>
#import <React/RCTLog.h>

static NSString* const TerminusEmasErrorCode_Success                = @"0";      // 成功
static NSString* const TerminusEmasErrorCode_ManServiceNotFound     = @"10001";  // manService获取失败
static NSString* const TerminusEmasErrorCode_ArgsNotFound           = @"10002";  // 传入参数为空
static NSString* const TerminusEmasErrorCode_PageNameNotFound       = @"10003";  // pageName未传入
static NSString* const TerminusEmasErrorCode_EventLabelNotFound     = @"10004";  // eventLabel未传入
static NSString* const TerminusEmasErrorCode_FrontPageNotFound      = @"10005";  // 未调用onPageStart
static NSString* const TerminusEmasErrorCode_PageNameDoesnotMatch   = @"10006";  // pageName不对应
static NSString* const TerminusEmasErrorCode_UserInfoNotFound       = @"10007";  // 用户参数传入错误
static NSString* const TerminusEmasErrorCode_UnknownError           = @"10000";  // 未知错误

@interface RNEmasManager : NSObject <RCTBridgeModule>
+(void) initWithAppKey:(NSString *)appKey appSecret:(NSString *)secretKey;
+(void) setDebug:(BOOL)value;
+(BOOL)requiresMainQueueSetup;
@property NSMutableArray *stack;
@property(readonly) NSTimeInterval systemUptime;
@end
