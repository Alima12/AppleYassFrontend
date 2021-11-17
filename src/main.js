import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios  from 'axios'
import Vue3PersianDatetimePicker from 'vue3-persian-datetime-picker'

window.$ = window.jQuery = require('jquery');
axios.defaults.baseURL = 'http://127.0.0.1:8000';
let defaulDateTime = {
    name: 'CustomDatePicker',
props: {
    format: 'YYYY-MM-DD HH:mm',
    displayFormat: 'jYYYY-jMM-jDD HH:mm',
    editable: true,
    inputClass: 'form-control',
    placeholder: 'تاریخ را انتخاب کنید',
    altFormat: 'YYYY-MM-DD HH:mm',
    color: '#00acc1',
    autoSubmit: false,
    //...
    //... And whatever you want to set as default.
    //...
    }
}
createApp(App).use(store).use(router).use(Vue3PersianDatetimePicker,defaulDateTime).mount('#app')
