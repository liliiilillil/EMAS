import EStyleSheet from 'react-native-extended-stylesheet';


const themes = { $textColor: '#0275d8' };

EStyleSheet.build(themes);

export function createStyle(style) {
  return EStyleSheet.create(style);
}


export { themes };
