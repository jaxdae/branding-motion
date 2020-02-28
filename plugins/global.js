import Vue from 'vue';

import highlight from 'vue-highlightjs';
import clipboard from 'v-clipboard';

import Card from '../components/AnimationCard/AnimationCard.vue'
import Button from '../components/Button/Button.vue'
import CrossRefSlider from '../components/CrossRefSlider/CrossRefSlider.vue'
import CrossSellCard from '../components/CrossSellCard/CrossSellCard.vue'
import Effect from '../components/Effect/Effect.vue'
import EmptyPlaceholder from '../components/EmptyPlaceholder/EmptyPlaceholder.vue'
import Feed from '../components/Feed/Feed.vue'
import Filters from '../components/Filters/Filters.vue'
import Footer from '../components/Footer/Footer.vue'
import Hero from '../components/Hero/Hero.vue'
import HeroSmall from '../components/HeroSmall/HeroSmall.vue'
import Popup from '../components/Popup/Popup.vue'
import PopupCode from '../components/PopupCode/PopupCode.vue'
import PopupUpload from '../components/PopupUpload/PopupUpload.vue'
import Preloader from '../components/Preloader/Preloader.vue'
import SetCard from '../components/SetCard/SetCard.vue'
import TopFilter from '../components/TopFilter/TopFilter.vue'

Vue.use(highlight);
Vue.use(clipboard);

Vue.component('Card', Card);
Vue.component('Button', Button);
Vue.component('cross-ref-slider', CrossRefSlider);
Vue.component('cross-sell-card', CrossSellCard);
Vue.component('Effect', Effect);
Vue.component('empty-placeholder', EmptyPlaceholder);
Vue.component('Feed', Feed);
Vue.component('Filters', Filters);
Vue.component('Footer', Footer);
Vue.component('Hero', Hero);
Vue.component('hero-small', HeroSmall);
Vue.component('Popup', Popup);
Vue.component('popup-code', PopupCode);
Vue.component('popup-upload', PopupUpload);
Vue.component('preloader', Preloader);
Vue.component('set-card', SetCard);
Vue.component('top-filter', TopFilter);
