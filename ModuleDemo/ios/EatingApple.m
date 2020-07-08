
#import <Foundation/Foundation.h>
#import <React/RCTBridgeModule.h>
#import <React/RCTLog.h>

@interface EatingApple : NSObject <RCTBridgeModule>

- (void) CLAP;

@end

@implementation EatingApple

- (void) CLAP{
  NSLog(@"这是clap函数");
}

RCT_EXPORT_MODULE()


RCT_EXPORT_METHOD(Clap){
  [ self CLAP];
}


RCT_EXPORT_METHOD(EatWithTool : (NSString *)tool)
{
  
  RCTLogWarn(@" oh ! I am eating apple with %@ ",tool);
}


RCT_REMAP_METHOD(TheMethodAliasName, GotAnotherName : (NSString *) ya)
{
  
}


RCT_EXPORT_METHOD(eatAsync: (NSDictionary *) ab
                  resolver: (RCTPromiseResolveBlock)resolve
                  rejecter: (RCTPromiseRejectBlock)reject)
{
  int a = ((NSNumber*)[ab objectForKey:@"a"]).intValue;
  int b =((NSNumber*)[ab objectForKey:@"b"]).intValue;
  id result = @{@"result":[NSNumber numberWithInt:(a+b)]};
  resolve(result);
  
//  NSString *a = [ab objectForKey:@"a"];
//  NSString *b = [ab objectForKey:@"b"];
//  NSArray *allValues=[ab allValues];
//  if(){
//    int c=3;
//    resolve(c);
//  }else{
//    reject(@"no events",@"no events ",[[NSError alloc] init]);
//  }
}


RCT_EXPORT_METHOD(CallbackFunc: (RCTResponseSenderBlock)callback)
{
  NSNumber *output = [[NSNumber alloc]initWithInt:2];
//  callback(@[[NSNull null],output]);
  callback(@[@{@"result":[NSNumber numberWithInt:(3)]},@{@"aa":@"cc"}]);
}

@end
