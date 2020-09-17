import React from 'react';
import { Text, View, Button } from 'react-native';
import { onSignUp, onLogin, onLogout, onPageEnd, onPageStart, onEvent } from '@terminus/react-native-emas'

export function Design(props) {
  return (
    
    <View>
      <Button title={'SignUp'} onPress={()=>onSignUp("userNick1")}/>
      <Button title={'Login'} onPress={()=>onLogin("userNick1","012345")}/>
      <Button title={'Logout'} onPress={()=>onLogout()}/>
      <Button title={'PageStart'} onPress={()=>onPageStart()}/>
      <Button title={'PageEnd'} onPress={()=>onPageEnd()}/>
      <Button title={'onEvent'} onPress={()=>onEvent({eventLabel:"label",eventPage:"eventPage",eventDuration:300,properties:{type:"rock",language:"cn"}})}/>
    </View>
  )        
}
