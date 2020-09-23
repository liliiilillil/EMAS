import React from 'react';
import { Design } from 'common/design-render';

function Activity(props) {
  return <Design {...props} />;
}

Activity.navigationOptions = {
  headerTitle: '活动',
};

export default Activity;
