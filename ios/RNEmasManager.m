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
    if(options==nil){
        reject(@"error",@"options==null",nil);
        return;
    }
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
    if(options==nil){
        reject(@"error",@"options==null",nil);
        return;
    }
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
    [tracker send:[pageHitBuilder build]];
}

//页面开始
RCT_EXPORT_METHOD(onPageStart:(NSString *)pageName resolve:(RCTPromiseResolveBlock)resolve reject:(__unused RCTPromiseRejectBlock)reject)
{
    if (pageName==nil) {
        reject(@"error",@"pageName==null",nil);
        return;
    }
    NSNumber *startTime=[NSNumber numberWithLong:([self getLaunchSystemTime])];//获取当前已启动时间
    if (_stack==nil) {
        _stack = [NSMutableArray array];        //获取模拟栈的状态，未初始化则初始化
    }
    NSDictionary *pageInfo =@{@"pageName":pageName,@"time":startTime};
    [_stack addObject:pageInfo];                        //将页面名称和当前时间传入模拟栈
}

RCT_EXPORT_METHOD(onPageEnd:(NSDictionary *)options resolve:(RCTPromiseResolveBlock)resolve reject:(__unused RCTPromiseRejectBlock)reject)
{
    NSString *pageName = options[@"pageName"];
    NSString *referPageName = options[@"referPageName"];
    NSDictionary *properties = options[@"properties"];
    if (_stack.count==0) {
        reject(@"error",@"please use onPageStart first",nil);   //若模拟栈为空则说明未使用onPageStart函数
    }
    if (pageName==nil) {
        reject(@"error",@"pageName==null",nil);
        return;
    }
    NSDictionary *lastObject=_stack.lastObject;                                   //取出栈顶元素
    //若栈顶元素和当前pageName不同则reject
    if ([pageName isEqualToString:[lastObject valueForKey:@"pageName"]]){
        NSNumber *endTime=[NSNumber numberWithLong:([self getLaunchSystemTime])];//获取当前时间
        NSNumber *startTime=[lastObject valueForKey:@"time"];                    //取出栈顶时间
        [_stack removeLastObject];                                               //模拟pop()
        NSNumber *durationNumber=[NSNumber numberWithLong:([endTime longValue]-[startTime longValue])];
        long *duration =[durationNumber longValue];                              //计算停留时间
        ALBBMANPageHitBuilder *pageHitBuilder = [[ALBBMANPageHitBuilder alloc] init];
        if (referPageName==nil) {
            if (_stack.count!=0) {                                              //若栈内还有其他元素则说明有前置页面
                NSDictionary *nowLastObject=_stack.lastObject;
                referPageName=[nowLastObject valueForKey:@"pageName"];
            }
        }
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
        [pageHitBuilder setReferPage:referPageName];
        [pageHitBuilder setPageName:pageName];
        [pageHitBuilder setDurationOnPage:duration];
        ALBBMANTracker *tracker = [[ALBBMANAnalytics getInstance] getDefaultTracker];
        [tracker send:[pageHitBuilder build]];
    }else{
        reject(@"error",@"pageName wrong",nil);
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
