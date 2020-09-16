import Activity from 'pages/activity';
import ComponentsList from 'pages/octopus_demo/components-list';
import ImageDemo from 'pages/octopus_demo/components/Image';
import TextDemo from 'pages/octopus_demo/components/Text';

export const businessRouterConfig = {
  Activity: { screen: Activity, path: 'activity' },
  ComponentsList: { screen: ComponentsList },
  ImageDemo: { screen: ImageDemo },
  TextDemo: { screen: TextDemo },
};
