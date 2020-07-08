import React, {Component} from 'react';
import {View, Button,Text,Alert,requireNativeCompoent} from 'react-native';

import MeasureModule from './MesaureModule';
import EatingAppleNM from './EatingAppleNM';
// import {NativeModules} from 'react-native';
// import CustomAndroidView from './CustomViewModules';
// import Permissions from 'components/Permissions';


async function test(){
  try{
  var {c} = await MeasureModule.passKeyWithPromise({a:1,b:2});
  console.log(`${c}  `)

  }catch(e){
          console.error(e);
  }}


   function aysncEating() {
    try {
        // var events = await EatingAppleNM.eatAsync({a:1,b:2});
        // console.log(events);


        // EatingAppleNM.eatAsync({a:1,b:2}).then((c,d)=>{
        //   console.log('----')
        //   console.log(c)
        //   console.log(d)
        //   console.log('+++++')


        EatingAppleNM.CallbackFunc((arg1,arg2)=>{
          console.log(arg1)
          console.log(arg2)
        })
         
    }catch (e) {
        console.error(e);
    }
 }



export default class App extends Component {
  render() {
    return (
      
        <View>
        <Text>1234</Text>
        <Text>1234</Text>
        <Text>1234</Text>
        <Text>1234</Text>
         {/* <CustomAndroidView style={{marginTop:100,marginLeft:100}}   onChange={(e)=>{console.log(e.nativeEvent);}} /> */}
        <Button
          title={'haha'}
          onPress={() => {
            MeasureModule.showWH();
          }}
        />

        
      
        <Button
          title={'hahaha'}
          onPress={() => {
            //MeasureModule.passKey();
            MeasureModule.passKey(
                (msg) => {
                  console.log(msg);
                },
                (a,b) => {
                  Alert.alert(a,b)
                }
              );
          }}
        />
        

        <Button
          title={'hahahaHA'}
          onPress={() => {
            test();

          }}
        />


          <Button
          title={'hahahaHAios'}
          onPress={() => {
            EatingAppleNM.Clap()
            
            aysncEating('watching tv');
          }}
        />



        <Button
          title={'permission'}
          onPress={() => {
            MeasureModule.getPermission();
            
          }}
        />

      </View>
    );
    
    }
  }

