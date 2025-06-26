import { createApp } from 'vue';
import App from './App.vue';
import vFocus from './directives/v-focus';
import vTooltip from './directives/v-tooltip';

const app = createApp(App);
app.directive('focus', vFocus);
app.directive('tooltip', vTooltip);
app.mount('#app');