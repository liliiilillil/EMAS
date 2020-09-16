import React from 'react';
import { Image, ScrollView, Platform } from 'react-native';

const styles = {
  imageWX: { height: '200px', width: '200px', backgroundColor: '#eeeeee', marginTop: '20px', display: 'block' },
  image: { height: 200, width: 200, backgroundColor: '#eeeeee', marginTop: 20 },
};

const isWechat = Platform.OS === 'wx';

export default class ImageDemo extends React.Component {
  render() {
    const commonHandle = res => console.log(res);
    const imgs = {
      data: [
        { resizeMode: 'cover' },
        { resizeMode: 'contain' },
        { resizeMode: 'stretch' },
        { resizeMode: 'repeat' },
        { resizeMode: 'center' },
        // { resizeMode: 'top' },
        // { resizeMode: 'left' },
        // { resizeMode: 'right' },
        // { resizeMode: 'bottom' },
        // { resizeMode: 'top left' },
        // { resizeMode: 'top right' },
        // { resizeMode: 'bottom left' },
        // { resizeMode: 'bottom right' },
      ],
      src: 'https://res.wx.qq.com/wxdoc/dist/assets/img/0.4cb08bb4.jpg',
    };
    return (
    <ScrollView
      style={{ flex: 1, display: 'flex', flexDirection: 'column' }}
      contentContainerStyle={{ alignItems: 'center' }}
    >
        {
            imgs.data.map(img => {
                // Image.getSize(imgs.src, (width, height) => { console.log(`image info width:${width}  height:${height}`); });
                return (
                    <Image
                      source={{ uri: imgs.src }}
                      style={isWechat ? styles.imageWX : styles.image}
                      resizeMode={`${img.resizeMode}`}
                      key={img.resizeMode}
                    />
                );
            })
        }
        </ScrollView>
    );
  }
}
