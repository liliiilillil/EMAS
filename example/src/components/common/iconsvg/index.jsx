import React from 'react';
import Svg, { Path } from 'react-native-svg';
import DefaultIcons from './iconfont-svg';

const ICON_SIZE = {
  xxs: 15,
  xs: 18,
  sm: 21,
  md: 22,
  lg: 36,
};

const icons = { ...DefaultIcons };

function IconSvg(props) {
  const { type, width, height, size, style, color } = props;
  return (
    <Svg
      width={width || ICON_SIZE[size] || size || 22}
      height={height || width || ICON_SIZE[size] || size || 22}
      viewBox={icons.viewBox[type] || '0 0 1024 1024'}
      style={{ ...style }}
    >
      {icons[type] &&
        icons[type].map((path, i) => {
          const fill = color || path.fill;
          return <Path key={i} d={path.d} fill={fill} />;
        })}
    </Svg>
  );
}

IconSvg.reloadResource = function(NewIcons) {
  Object.assign(icons, NewIcons);
};

export { IconSvg };
