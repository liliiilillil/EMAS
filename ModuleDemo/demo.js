import React,{Component} from 'react';
import {requireNativeComponent,view}from 'react-native';

var RCTCustomView=requireNativeComponent('RCTCustomView',CustomAndroidView);



class CustomAndroidView extends Component{
    render(){
        return(
            <RCTCustomView  {...this.props}/>
        );

    }

}


module.exports=CustomAndroidView;
