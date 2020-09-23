import React, { useEffect, useState, useCallback } from 'react';
import { Image, View, Button } from 'react-native';
import { createStyle } from '../../../styles';
// import logo from 'images/white-logo.png';

const style = createStyle({
  container: {
    position: 'relative',
    width: '100%',
    height: '100%',
    flex: 1,
    backgroundColor: '#5d48df',
  },
  skipCon: {
    marginTop: 40,
    height: 30,
    flex: 0,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
  skip: {
    height: 30,
    width: 100,
    marginRight: 24,
    color: '#fff',
  },
  imageCon: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 100,
  },
  image: {
    width: 360,
    height: 75,
  },
});

let timer = null;

export function Guide(props) {
  const [time, setTime] = useState(5);

  const count = useCallback(function(t) {
    clearTimeout(timer);
    setTime(t);
    if (t > 0) {
      timer = setTimeout(() => {
        count(t - 1);
      }, 1000);
    } else {
      props.navigation.navigate('App');
    }
  }, []);

  useEffect(() => {
    count(time);
    return () => {
      clearTimeout(timer);
    };
  }, []);

  function skip() {
    clearTimeout(timer);
    setTime(0);
    props.navigation.navigate('App');
  }


  return (
    <View style={style.container}>
      <View style={style.skipCon}>
        <Button style={style.skip} onPress={skip} title={`跳过(${time})`} color="#fff" />
      </View>
      <View style={style.imageCon}>
        <Image style={style.image} source={require('images/white-logo.png')} />
      </View>
    </View>
  );
}
