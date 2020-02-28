<template>
  <div class="Preloader__wrapper">
  <div v-if="once" class="Preloader__text">Branding <br/> motion</div>
  <div class="Preloader">
    <svg class="Preloader__svg" width="93px" height="57px" viewBox="0 0 93 57" version="1.1">
      <g transform="translate(0.000000, -18.000000)" stroke="#D9AF99" stroke-width="4">
        <g v-if="!once" transform="translate(0.000000, 20.000000)">
          <path class="Preloader__path Preloader__path--4" d="M1,35.3035954 C15.7181543,38.1144303 29.884821,32.4164263 43.5,18.2095833 C57.115179,4.00274026 71.2818457,-1.40808551 86,1.97710598"></path>
          <path class="Preloader__path Preloader__path--5" d="M4,43.3035954 C18.7181543,46.1144303 32.884821,40.4164263 46.5,26.2095833 C60.115179,12.0027403 74.2818457,6.59191449 89,9.97710598"></path>
          <path class="Preloader__path Preloader__path--6" d="M7,51.3035954 C21.7181543,54.1144303 35.884821,48.4164263 49.5,34.2095833 C63.115179,20.0027403 77.2818457,14.5919145 92,17.977106"></path>
          <path class="Preloader__path Preloader__path--7" d="M4,43.2972572 C18.7181543,46.1336743 32.884821,40.3838113 46.5,26.0476684 C60.115179,11.7115255 74.2818457,5.91630552 89,8.66200851"  transform="translate(46.500000, 26.000000) scale(-1, 1) translate(-46.500000, -26.000000) "></path>
          <path class="Preloader__path Preloader__path--1" d="M6,34.3035954 C20.7181543,37.1144303 34.884821,31.4164263 48.5,17.2095833 C62.115179,3.00274026 76.2818457,-2.40808551 91,0.977105979" transform="translate(48.500000, 17.500000) scale(-1, 1) translate(-48.500000, -17.500000) "></path>
          <path class="Preloader__path Preloader__path--2" d="M4,43.2972572 C18.7181543,46.1336743 32.884821,40.3838113 46.5,26.0476684 C60.115179,11.7115255 74.2818457,5.91630552 89,8.66200851"  transform="translate(46.500000, 26.000000) scale(-1, 1) translate(-46.500000, -26.000000) "></path>
          <path class="Preloader__path Preloader__path--3" d="M0,52.7870815 C15.3852039,54.2894528 29.8853332,47.8411783 43.5003879,33.4422579 C57.1154426,19.0433375 71.28198,13.559357 86,16.9903165" transform="translate(43.000000, 34.500000) scale(-1, 1) translate(-43.000000, -34.500000) "></path>
        </g>
        <g v-else transform="translate(0.000000, 20.000000)">
          <path class="Preloader__once Preloader__once--4" d="M1,35.3035954 C15.7181543,38.1144303 29.884821,32.4164263 43.5,18.2095833 C57.115179,4.00274026 71.2818457,-1.40808551 86,1.97710598"></path>
          <path class="Preloader__once Preloader__once--5" d="M4,43.3035954 C18.7181543,46.1144303 32.884821,40.4164263 46.5,26.2095833 C60.115179,12.0027403 74.2818457,6.59191449 89,9.97710598"></path>
          <path class="Preloader__once Preloader__once--6" d="M7,51.3035954 C21.7181543,54.1144303 35.884821,48.4164263 49.5,34.2095833 C63.115179,20.0027403 77.2818457,14.5919145 92,17.977106"></path>
          <path class="Preloader__once Preloader__once--7" d="M4,43.2972572 C18.7181543,46.1336743 32.884821,40.3838113 46.5,26.0476684 C60.115179,11.7115255 74.2818457,5.91630552 89,8.66200851"  transform="translate(46.500000, 26.000000) scale(-1, 1) translate(-46.500000, -26.000000) "></path>
          <path class="Preloader__once Preloader__once--1" d="M6,34.3035954 C20.7181543,37.1144303 34.884821,31.4164263 48.5,17.2095833 C62.115179,3.00274026 76.2818457,-2.40808551 91,0.977105979" transform="translate(48.500000, 17.500000) scale(-1, 1) translate(-48.500000, -17.500000) "></path>
          <path class="Preloader__once Preloader__once--2" d="M4,43.2972572 C18.7181543,46.1336743 32.884821,40.3838113 46.5,26.0476684 C60.115179,11.7115255 74.2818457,5.91630552 89,8.66200851"  transform="translate(46.500000, 26.000000) scale(-1, 1) translate(-46.500000, -26.000000) "></path>
          <path class="Preloader__once Preloader__once--3" d="M0,52.7870815 C15.3852039,54.2894528 29.8853332,47.8411783 43.5003879,33.4422579 C57.1154426,19.0433375 71.28198,13.559357 86,16.9903165" transform="translate(43.000000, 34.500000) scale(-1, 1) translate(-43.000000, -34.500000) "></path>
        </g>
      </g>
    </svg>
  </div>
  </div>
</template>

<script>
export default {
  name: 'Preloader',
  props: {
    once: {
      type: Boolean,
      default: false
    }
  }
};
</script>

<style lang="scss">
@import './Preloader.scss';
</style>
