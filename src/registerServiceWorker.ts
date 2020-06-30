/* eslint-disable no-console */

import {register} from 'register-service-worker'

// 改为在开发环境同样注册
// if (process.env.NODE_ENV === 'production')
const version = 'v1.0.0';

register(`${process.env.BASE_URL}service-worker.js`, {
    ready(reg) {
        console.log(
            'App is being served from cache by a service worker.\n' +
            'For more details, visit https://goo.gl/AFskqB'
        );
    },
    registered(reg) {
        console.log('Service worker has been registered.')
        if (localStorage.getItem('sw_version') !== version) {
            console.error('Service worker need Update')
            reg.update().then(function () {
                localStorage.setItem('sw_version', version)
            });
        }
    },
    cached() {
        console.log('Content has been cached for offline use.')
    },
    updatefound() {
        console.log('New content is downloading.')
    },
    updated() {
        console.log('New content is available; please refresh.')
    },
    offline() {
        console.log('No internet connection found. App is running in offline mode.')
    },
    error(error) {
        console.error('Error during service worker registration:', error)
    }
})
