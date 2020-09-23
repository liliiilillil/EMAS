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
    NSArray *removeGlobalProperty = options[@"removeGlobalProperty"];
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
    if (removeGlobalProperty!=nil&&[removeGlobalProperty count]) {
        int count=removeGlobalProperty.count;
        for (int i=0; i<count; i++) {
            [tracker removeGlobalProperty:[removeGlobalProperty objectAtIndex:i]];
        }
    }
    // 组装日志并发送
    [tracker send:[pageHitBuilder build]];
}

//页面开始
RCT_EXPORT_METHOD(onPageStart:(NSString *)pageName)
{
    _startTime=[NSNumber numberWithLong:([self getLaunchSystemTime])];//获取当前系统运行时间
    if (_timeStack==nil) {
        _timeStack = [NSMutableArray array];    //未初始化则初始化模拟栈
    }
    if (_pageStack==nil) {
        _pageStack = [NSMutableArray array];
    }
    _timecount=_timeStack.count;
    _pagecount=_pageStack.count;
    [_timeStack insertObject:_startTime atIndex:_timecount];    //模拟入栈
    [_pageStack insertObject:pageName atIndex:_pagecount];
    
}

RCT_EXPORT_METHOD(onPageEnd:(NSString *)pageName resolve:(RCTPromiseResolveBlock)resolve reject:(__unused RCTPromiseRejectBlock)reject)
{
    if ([pageName isEqual:_pageStack.lastObject]) {
        NSNumber *endTime=[NSNumber numberWithLong:([self getLaunchSystemTime])];//获取当前时间
        NSNumber *startTime=_timeStack.lastObject;  //栈顶(数组最后一项)即为配对页面的开始时间
        [_pageStack removeLastObject];//模拟pop()
        [_timeStack removeLastObject];
        NSNumber *durationNumber=[NSNumber numberWithLong:([endTime longValue]-[_startTime longValue])];//获取时间差
        long *duration =[durationNumber longValue];     //api要求long格式
        ALBBMANPageHitBuilder *pageHitBuilder = [[ALBBMANPageHitBuilder alloc] init];
        [pageHitBuilder setReferPage:_pageStack.lastObject];
        [pageHitBuilder setPageName:pageName];
        [pageHitBuilder setDurationOnPage:duration];
        ALBBMANTracker *tracker = [[ALBBMANAnalytics getInstance] getDefaultTracker];
        [tracker send:[pageHitBuilder build]];
    }else{
        reject(@"error",@"pageName doesn't match",nil);
    }
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

//注销
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

- (long)getLaunchSystemTime
{
    NSTimeInterval timer_ = [NSProcessInfo processInfo].systemUptime;
    return timer_;
}

+ (BOOL)requiresMainQueueSetup
{
    return YES;  // only do this if your module initialization relies on calling UIKit!
}
@end
