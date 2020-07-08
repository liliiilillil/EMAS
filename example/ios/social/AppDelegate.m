/**
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

#import "AppDelegate.h"

#import <React/RCTBundleURLProvider.h>
#import <React/RCTRootView.h>
#import "RCTSocialManager.h"

@implementation AppDelegate

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
  NSURL *jsCodeLocation;

  jsCodeLocation = [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"index" fallbackResource:nil];

  RCTRootView *rootView = [[RCTRootView alloc] initWithBundleURL:jsCodeLocation
                                                      moduleName:@"social"
                                               initialProperties:nil
                                                   launchOptions:launchOptions];
  rootView.backgroundColor = [[UIColor alloc] initWithRed:1.0f green:1.0f blue:1.0f alpha:1];

  self.window = [[UIWindow alloc] initWithFrame:[UIScreen mainScreen].bounds];
  [self setLoadingView:rootView];
  UIViewController *rootViewController = [UIViewController new];
  rootViewController.view = rootView;
  self.window.rootViewController = rootViewController;
  [self.window makeKeyAndVisible];
  [self socialChannelInit];
  return YES;
}

//设置loadingview，防止bundle加载过程中出现白屏现象00--00-0-
- (void) setLoadingView:(RCTRootView *) rootView{
  
  CGSize viewSize = self.window.bounds.size;
  NSString *viewOrientation = @"Portrait";    //横屏请设置成 @"Landscape"
  NSString *launchImage = nil;
  NSArray* imagesDict = [[[NSBundle mainBundle] infoDictionary] valueForKey:@"UILaunchImages"];
  for (NSDictionary* dict in imagesDict)
  {
    CGSize imageSize = CGSizeFromString(dict[@"UILaunchImageSize"]);
    
    if (CGSizeEqualToSize(imageSize, viewSize) && [viewOrientation isEqualToString:dict[@"UILaunchImageOrientation"]])
    {
      launchImage = dict[@"UILaunchImageName"];
    }
  }
  if(launchImage != nil) {
    UIImageView *splashImage = [[UIImageView alloc]initWithFrame:[UIScreen mainScreen].bounds];
    [splashImage setImage:[UIImage imageNamed:launchImage]];
    [rootView setLoadingView:splashImage];
  }
}

- (void) socialChannelInit{
  [[RCTSocialManager socialInstance] initSocialChannel:SocialPlatformType_Wechat appKey:@"wx841beca0556887cc" appSecret:@"" redirect:@""];
  [[RCTSocialManager socialInstance] initSocialChannel:SocialPlatformType_QQ appKey:@"1108194090" appSecret:@"xaTesejJJy0gtjuc" redirect:@""];
  [[RCTSocialManager socialInstance] initSocialChannel:SocialPlatformType_Sina appKey:@"1425904738" appSecret:@"439eae12d4ac3236d277cbd036241926" redirect:@"https://api.weibo.com/oauth2/default.html"];
}

//- (BOOL)application:(UIApplication *)app openURL:(NSURL *)url options:(NSDictionary<UIApplicationOpenURLOptionsKey,id> *)options {
//
//}

- (BOOL) openURL:(NSURL *) url options:(NSDictionary *)options {
  //[[RCTSocialManager socialInstance] ]
  [[RCTSocialManager socialInstance] handleOpenUrl:url options:options];
  return YES;
}

- (BOOL)application:(UIApplication *)application
            openURL:(NSURL *)url
  sourceApplication:(NSString *)sourceApplication
         annotation:(id)annotation
{
  return  [self openURL:url options:nil];
}

- (BOOL)application:(UIApplication *)app
            openURL:(NSURL *)url
            options:(NSDictionary<UIApplicationOpenURLOptionsKey, id> *)options {
  return [self openURL:url options:options];
}

- (BOOL)application:(UIApplication *)application handleOpenURL:(NSURL *)url {
  return [self openURL:url options:nil];
}

@end
