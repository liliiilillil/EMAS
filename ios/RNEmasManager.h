#import <React/RCTBridgeModule.h>
#import <React/RCTLog.h>

@interface RNEmasManager : NSObject <RCTBridgeModule>
+(void) initWithAppKey:(NSString *)appKey appSecret:(NSString *)secretKey;
+(void) setDebug:(BOOL)value;
@end
