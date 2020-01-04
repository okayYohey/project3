import Vue from 'vue';
import Vuetify from 'vuetify/lib';
import colors from 'vuetify/es5/util/colors';

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    dark: false,
    themes: {
      dark: {
        primary: colors.pink.darken1,
        secondary: colors.lightGreen.base,
        accent: colors.cyan.base,
        error: colors.amber.base,
        warning: colors.orange.base,
        info: colors.blue.lighten1,
        success: colors.green.base
      },
      light: {
        primary: colors.pink.darken1,
        secondary: colors.lightGreen.base,
        accent: colors.cyan.base,
        error: colors.amber.base,
        warning: colors.orange.base,
        info: colors.blue.lighten1,
        success: colors.green.base
      }
    }
  }
});