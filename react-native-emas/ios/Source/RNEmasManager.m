#import "RNEmasManager.h"
#import <AlicloudMobileAnalitics/ALBBMAN.h>


@implementation RNEmasManager

RCT_EXPORT_MODULE(RNEmasModule);

+(void) initWithAppKey:(NSString *)appKey appSecret:(NSString *)secretKey
{
    ALBBMANAnalytics *man = [ALBBMANAnalytics getInstance];
    [man autoInit];
}


+(void) setDebug:(BOOL)value
{
    if (value) {
        ALBBMANAnalytics *man = [ALBBMANAnalytics getInstance];
        [man turnOnDebug];
    }
}

RCT_EXPORT_METHOD(onEvent:(NSDictionary *)options)
{
    NSString *eventLabel = options[@"eventLabel"];
    NSString *eventPage = options[@"eventPage"];
    long *eventDuration =[options[@"eventDuration"] longValue];
    NSDictionary *properties = options[@"properties"];
    if(eventLabel == nil) {
        return;
    }
    ALBBMANCustomHitBuilder *customBuilder = [[ALBBMANCustomHitBuilder alloc] init];
    [customBuilder setEventLabel:eventLabel];
    [customBuilder setEventPage:eventPage];
    [customBuilder setDurationOnEvent:eventDuration];
    if(properties != nil && [properties count]) {
        NSArray *keys;
         int i, count;
         id key, value;
         keys = [properties allKeys];
         count = [keys count];
         for (i = 0; i < count; i++)
        　　{
         　　　　key = [keys objectAtIndex: i];
         　　　　value = [properties objectForKey: key];
         　　　　[customBuilder setProperty:key value:value];
        　　}
    }
    ALBBMANTracker *traker = [[ALBBMANAnalytics getInstance] getDefaultTracker];
    NSDictionary *dic = [customBuilder build];
    [traker send:dic];
}

//登录
RCT_EXPORT_METHOD(onLogin:(NSString *)userNick userid:(NSString *)userId)
{
    ALBBMANAnalytics *man = [ALBBMANAnalytics getInstance];
    [man updateUserAccount:userNick userid:userId];
}

RCT_EXPORT_METHOD(onLogout)
{
    ALBBMANAnalytics *man = [ALBBMANAnalytics getInstance];
    [man updateUserAccount:@"" userid:@""];
}

//注册
RCT_EXPORT_METHOD(onSignUp:(NSString *)userNick)
{
    ALBBMANAnalytics *man = [ALBBMANAnalytics getInstance];
    [man userRegister:userNick];
}

//页面开始
RCT_EXPORT_METHOD(onPageStart)
{
    dispatch_async(dispatch_get_main_queue(), ^{
        UIViewController * rootVc = [UIApplication sharedApplication].keyWindow.rootViewController;
        if ([rootVc isKindOfClass:[UINavigationController class]]) {
            UINavigationController * vc =  (UINavigationController*)rootVc;
            rootVc = vc.topViewController;
        }
        [[ALBBMANPageHitHelper getInstance] pageAppear:rootVc];
    });
}

//页面结束
RCT_EXPORT_METHOD(onPageEnd)
{
    dispatch_async(dispatch_get_main_queue(), ^{
        UIViewController * rootVc = [UIApplication sharedApplication].keyWindow.rootViewController;
        if ([rootVc isKindOfClass:[UINavigationController class]]) {
            UINavigationController * vc =  (UINavigationController*)rootVc;
            rootVc = vc.topViewController;
        }
        [[ALBBMANPageHitHelper getInstance] pageDisAppear:rootVc];
    });
}

@end
