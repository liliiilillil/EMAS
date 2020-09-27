import React from 'react';
import { Text, View, Button } from 'react-native';
import { onSignUp, onLogin, onLogout, onPageInfo, onEvent,onPageStart,onPageEnd } from '@terminus/react-native-emas'

export function Design(props) {
  return (
    
    <View>
      <Button title={'SignUp'} onPress={()=>onSignUp("userNick1")}/>
      <Button title={'Login'} onPress={()=>onLogin("userNick1","012345")}/>
      <Button title={'Logout'} onPress={()=>onLogout()}/>
      <Button title={'PageStart1'} onPress={()=>onPageStart("duration test page1")}/>
      <Button title={'PageEnd1'} onPress={()=>onPageEnd({pageName:"duration test page1",referPageName:"referPage",properties:{key1:"value1",key2:"value2"}})}/>
      <Button title={'PageStart2'} onPress={()=>onPageStart("duration test page2")}/>
      <Button title={'PageEnd2'} onPress={()=>onPageEnd({pageName:"duration test page2",properties:{key1:"value1",key2:"value2"}})}/>
      <Button title={'onPageInfo'} onPress={()=>onPageInfo({pageName:"myTestPage",referPageName:"myReferPageName",duration:200,properties:{gender:"male",height:"182"},globalProperty:{key:"value"},removeGlobalProperty:["first","second","third"]})}/>
      <Button title={'onEvent'} onPress={()=>onEvent({eventLabel:"label",eventPage:"eventPage",eventDuration:300,properties:{type:"rock",language:"cn"}})}/>
    </View>
  )        
}
