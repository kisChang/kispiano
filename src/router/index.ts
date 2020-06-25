import Vue from 'vue'
import VueRouter, {RouteConfig} from 'vue-router'
import Home from '../views/Home.vue'
import PianoView from '../views/PianoView.vue'
import MidiTestView from '../views/MidiTestView.vue'

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
    {
        path: '/', name: 'Home', component: Home
    },
    {
        path: '/test/piano', name: 'PianoView', component: PianoView
    },
    {
        path: '/test/midi', name: 'MidiTestView', component: MidiTestView
    },
    {
        path: '/about', name: 'About',
        component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
    }
];

const router = new VueRouter({
    routes
});

export default router
