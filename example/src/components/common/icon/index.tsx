import React from 'react';
// import { Svg, Iconfont } from '@terminus/rn-components';
import { svgIcon } from 'fonts/iconfont-svg';
import { IconSvg as Svg } from 'common/iconsvg';
import { IconFont as Iconfont } from 'common/iconfont';
// import { View } from 'react-native';

// new Svg().reloadResource(svgIcon);
Svg.reloadResource(svgIcon);

export type IconProps = (
  | {
      useSvg?: true; // default: true
      type: Exclude<keyof typeof svgIcon, 'viewBox'>;
      height?: number; // 仅svg生效
      width?: number; // 仅svg生效
    }
  | { useSvg: false; type: string }
) & {
  size: 'xxs' | 'xs' | 'sm' | 'md' | 'lg';
  color: CSSStyleDeclaration['color'];
  style: CSSStyleDeclaration;
};

export function Icon(props: IconProps) {
  const { useSvg = true } = props;

  // return <View />
  if (useSvg) {
    return <Svg {...props} />;
  }

  return <Iconfont {...props} />;
}
