import React from 'react'
import { NativeModules, Platform } from 'react-native'

const RNEmasModule=NativeModules.RNEmasModule;

export interface EventParams{
  eventLabel:String,
  eventPage:String,
  eventDuration:Number,
  properties:Map<String,String>
}

export interface PageInfoParams{
  pageName:String,
  referPageName:String,
  duration:Number,
  properties:Map<String,String>,
  globalProperty:Map<String,String>,
  removeGlobalProperty:Array<String>
}

const onSignUp=(usernick:string)=>{
  if(RNEmasModule){
    return RNEmasModule.onSignUp(usernick);
  }else{
    Promise.reject("error!Module doesn't exist!")
  }   
}

const onLogin=(usernick:string,userId:string)=>{
  if(RNEmasModule){
    RNEmasModule.onLogin(usernick,userId);
    Promise.resolve("login succeed")
    return; 
  }else{
    Promise.reject("error!Module doesn't exist!")
  }   
}

const onLogout=()=>{
  if(RNEmasModule){
    RNEmasModule.onLogout();
    Promise.resolve("logout succeed")
    return; 
  }else{
    Promise.reject("error!Module doesn't exist!")
  }   
}

const onPageInfo=(params:PageInfoParams)=>{
  if(RNEmasModule){
    return RNEmasModule.onPageInfo(params);
  }else{
    Promise.reject("error!Module doesn't exist!")
  }   
}

const onEvent=(params:EventParams)=>{
  if(RNEmasModule){
    return RNEmasModule.onEvent(params);
  }else{
    Promise.reject("error!Module doesn't exist!")
  }   
}

export{ onSignUp, onLogin, onLogout, onPageInfo, onEvent }