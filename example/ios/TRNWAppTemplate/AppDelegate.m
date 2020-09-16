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
#import <React/RCTLinkingManager.h>
#import "RNEmasManager.h"
#import <AlicloudMobileAnalitics/ALBBMAN.h>
@implementation AppDelegate

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
  NSURL *jsCodeLocation;
  RCTBridge *bridge = [[RCTBridge alloc] initWithDelegate:self launchOptions:launchOptions];
  jsCodeLocation = [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"index" fallbackResource:nil];

  RCTRootView *rootView = [[RCTRootView alloc] initWithBridge:bridge
                                                   moduleName:@"TRNWAppTemplate"
                                            initialProperties:nil];

  // RCTRootView *rootView = [[RCTRootView alloc] initWithBundleURL:jsCodeLocation
  //                                                     moduleName:@"TRNWAppTemplate"
  //                                              initialProperties:nil
  //                                                  launchOptions:launchOptions];
  rootView.backgroundColor = [[UIColor alloc] initWithRed:1.0f green:1.0f blue:1.0f alpha:1];

  self.window = [[UIWindow alloc] initWithFrame:[UIScreen mainScreen].bounds];
  [self setLoadingView:rootView];
  UIViewController *rootViewController = [UIViewController new];
  rootViewController.view = rootView;
  self.window.rootViewController = rootViewController;
  [self.window makeKeyAndVisible];
  ALBBMANAnalytics *man = [ALBBMANAnalytics getInstance];
  [man autoInit];
  return YES;
}

//设置loadingview，防止bundle加载过程中出现白屏现象00--00-0-
- (void) setLoadingView:(RCTRootView *) rootView{
  UIImageView *splashImage = [[UIImageView alloc]initWithFrame:[UIScreen mainScreen].bounds];
  [splashImage setContentMode:UIViewContentModeScaleAspectFill];
  [splashImage setImage:[UIImage imageNamed:@"Image"]];
  [rootView setLoadingView:splashImage];
}

- (NSURL *)sourceURLForBridge:(RCTBridge *)bridge
{
#if DEBUG
  return [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"index" fallbackResource:nil];
#else
  return [[NSBundle mainBundle] URLForResource:@"main" withExtension:@"jsbundle"];
#endif
}

- (BOOL)application:(UIApplication *)app openURL:(NSURL *)url options:(NSDictionary<UIApplicationOpenURLOptionsKey,id> *)options {
  return [RCTLinkingManager application:app openURL:url options:options];
}

@end
