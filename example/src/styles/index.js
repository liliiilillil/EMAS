import { createStyle } from './theme';

export const commonStyle = createStyle({
  textCenter: {
    textAlign: 'center',
  },
  container: {
    position: 'relative',
    display: 'flex',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

});

export { createStyle };
