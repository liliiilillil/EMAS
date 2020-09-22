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

RCT_EXPORT_METHOD(onEvent:(NSDictionary *)options
                  resolve:(RCTPromiseResolveBlock)resolve
                  reject:(__unused RCTPromiseRejectBlock)reject)
{
    NSString *eventLabel = options[@"eventLabel"];
    NSString *eventPage = options[@"eventPage"];
    long *eventDuration =[options[@"eventDuration"] longValue];
    NSDictionary *properties = options[@"properties"];
    if(eventLabel == nil) {
        reject(@"error",@"eventLabel=null!",nil);
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

RCT_EXPORT_METHOD(onPageInfo:(NSDictionary *)options
                  resolve:(RCTPromiseResolveBlock)resolve
                  reject:(__unused RCTPromiseRejectBlock)reject)
{
    ALBBMANPageHitBuilder *pageHitBuilder = [[ALBBMANPageHitBuilder alloc] init];
    NSString *pageName = options[@"pageName"];
    NSString *referPageName = options[@"referPageName"];
    long *duration =[options[@"duration"] longValue];
    NSDictionary *properties = options[@"properties"];
    NSDictionary *globalProperty = options[@"globalProperty"];
    NSString *removeGlobalProperty = options[@"removeGlobalProperty"];
    if(pageName == nil) {
        reject(@"error",@"pageName=null!",nil);
        return;
    }
    [pageHitBuilder setReferPage:referPageName];
    [pageHitBuilder setPageName:pageName];
    [pageHitBuilder setDurationOnPage:duration];
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
                [pageHitBuilder setProperty:key value:value];
                　　}
    }
    
    ALBBMANTracker *tracker = [[ALBBMANAnalytics getInstance] getDefaultTracker];
    if (globalProperty!=nil&&[globalProperty count]) {
        NSArray *keys;
        int i, count;
        id key, value;
        keys = [properties allKeys];
        count = [keys count];
        for (i = 0; i < count; i++)
            　　{
                　　　　key = [keys objectAtIndex: i];
                　　　　value = [properties objectForKey: key];
                [tracker setGlobalProperty:key value:value];
                　　}
    }
    if (removeGlobalProperty!=nil) {
        [tracker removeGlobalProperty:removeGlobalProperty];
    }
    // 组装日志并发送
    [tracker send:[pageHitBuilder build]];
    
}

//登录
RCT_EXPORT_METHOD(onLogin:(NSString *)userNick userid:(NSString *)userId resolve:(RCTPromiseResolveBlock)resolve reject:(__unused RCTPromiseRejectBlock)reject)
{
    if (userNick==nil||userId==nil) {
        reject(@"error",@"userNick==null||userId==null",nil);
        return;
    }
    ALBBMANAnalytics *man = [ALBBMANAnalytics getInstance];
    [man updateUserAccount:userNick userid:userId];
}

RCT_EXPORT_METHOD(onLogout)
{
    ALBBMANAnalytics *man = [ALBBMANAnalytics getInstance];
    [man updateUserAccount:@"" userid:@""];
}

//注册
RCT_EXPORT_METHOD(onSignUp:(NSString *)userNick resolve:(RCTPromiseResolveBlock)resolve reject:(__unused RCTPromiseRejectBlock)reject)
{
    if (userNick==nil) {
        reject(@"error",@"userNick==null",nil);
        return;
    }
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

+ (BOOL)requiresMainQueueSetup
{
    return YES;  // only do this if your module initialization relies on calling UIKit!
}
@end
