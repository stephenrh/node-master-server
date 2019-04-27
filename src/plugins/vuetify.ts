import Vue from 'vue'
/// @ts-ignore
import Vuetify from 'vuetify/lib'
import '@/style/vuetify/app.styl'
import 'material-icons/css/material-icons.min.css'

Vue.use(Vuetify, {
  theme: {
    primary: '#e91e63',
    secondary: '#757575',
    accent: '#9E9E9E',
    error: '#FF5252',
    info: '#2196F3',
    success: '#4CAF50',
    warning: '#FFC107'
  },
  iconfont: 'mdi',
})
