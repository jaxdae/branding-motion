<template>
<span class="slider-1">
    <slick
  v-if="ready"
  :style="cssProps"
  :options="slickOptions"
  ref="slick"
  class="slick"
  @beforeChange="handleBeforeChange"
  @afterChange="handleAfterChange">
      <div v-for="card in cardData" :key="card.headline" class="card">
        <img :src="card.image">
      </div>
 </slick>
 <div class="headlines">
 <h1 v-for="card in cardData" class="headline" :key="card.headline">{{card.headline}}</h1>
 </div>
 </span>
</template>

<style lang="scss">
@import '../styles/slick.scss';
.slider-1{
  .headlines{
    display: flex;
    flex-flow: row wrap;
    align-items: center;
    position: absolute;
    height: 100%;
    top:0;
    left:20%;
  }
  .headline{
    -webkit-text-stroke: 1px white;
    color: transparent;
  width:100%;
  font-weight:700;
  font-size: 50px;
  letter-spacing: 5px;
  text-transform: uppercase;
  font-family: Barlow Semi Condensed;

}
.slick{
  width:50%;
  height:100%;
  border-radius: 15px;
  margin-left:35%;

.card{
  display: flex !important;
  justify-content: center;
  position: relative;
  height:400px;
}

.slick-next{
  right:calc(50% - 50px);
  position: absolute;
  &::after{
  transition: var(--static) all var(--slow);
  content: '';
  position: absolute;
  z-index: +2;
  top: calc(50% - 1px);
  right: calc(50% - 7px);
  width: 0.75rem;
  height: 0.125rem;  
  background: white;
  transform: translateX(-0.2rem);
  opacity: 0;
  }
  &::before{
  transition: var(--static) all var(--slow);
  position: absolute;
  z-index: +2;
  content: '';
  top: calc(50% - 5px);
  right: calc(50% - 5px);
  width: 0.625rem;
  height: 0.625rem;
  border-top: 0.125rem solid #fff;
  border-right: 0.125rem solid #fff;
  transform: rotate(45deg);
}
}
.slick-arrow{
  position: absolute;
  background: none;
  border:none;
  width: 50px;
  height: 50px;
  background-color: var(--primaryColor);
  z-index: +1;
  font-size:0;
  bottom: 30px;
  border-radius: var(--rectilineal);
}
.slick-arrow:hover{
  cursor: pointer;
}

.slick-arrow:hover.slick-prev::after
{
  opacity: 1;
  transform: translateX(-0.4rem);
}
.slick-arrow:hover.slick-prev::before
{
  transform: translateX(-0.25rem) rotate(225deg);
}
.slick-arrow:hover.slick-next::after
{
  opacity: 1;
  transform: translateX(0);
}
.slick-arrow:hover.slick-next::before
{
  transform: translateX(0.25rem) rotate(45deg);
}


.slick-prev{
  left:calc(50% - 50px);
  &::after{
  transition: var(--static) all var(--slow);
  content: '';
  position: absolute;
  z-index: +2;
  top: calc(50% - 1px);
  right: calc(50% - 11px);
  width: 0.75rem;
  height: 0.125rem;  
  background: white;
  transform: translateX(-0.2rem);
  opacity: 0;
  }
   &::before{
  transition: var(--static) all var(--slow);
  position: absolute;
  z-index: +2;
  content: '';
  top: calc(50% - 5px);
  right: calc(50% - 5px);
  width: 0.625rem;
  height: 0.625rem;
  border-top: 0.125rem solid #fff;
  border-right: 0.125rem solid #fff;
  transform: rotate(225deg);
}
}
img{
  height:100%;
  width: 100%;
  object-fit: cover;
}
}
}
</style>

<script>
import { mapGetters } from 'vuex';
export default {
  props: {
    vars: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return{
      ready: false,
      slickOptions: {
        vertical: true,
        verticalSwiping: true,
        arrows: false
      },
      cardData: [
        {
          headline: 'Lac Blanc',
          content: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.',
          image: '/mountain.jpeg'
        },
        {
          headline: 'Matterhorn',
          content: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod.',
          image: '/mountain1.jpeg'
        },
        {
          headline: 'Iceland',
          content: 'lorem ipsum dolor sit amet',
          image: '/mountain2.jpeg'
        },
        {
          headline: 'Lac Blanc',
          content: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.',
          image: '/mountain.jpeg'
        },
        {
          headline: 'Matterhorn',
          content: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod.',
          image: '/mountain1.jpeg'
        },
        {
          headline: 'Iceland',
          content: 'lorem ipsum dolor sit amet',
          image: '/mountain2.jpeg'
        },
        {
          headline: 'Matterhorn',
          content: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod.',
          image: '/mountain1.jpeg'
        },
        {
          headline: 'Iceland',
          content: 'lorem ipsum dolor sit amet',
          image: '/mountain2.jpeg'
        }
      ],
    }
  },
  computed: {
    ...mapGetters([
      'primaryColor',
      'secondaryColor',
    ]),
     cssProps() {
       return {
        '--slow': (this.vars.slow) + "s",
        '--slow2': (this.vars.slow * 0.1) + "s",
        '--rough': (this.vars.rough),
        '--hard01': (this.vars.hard01),
        '--rectilineal': (this.vars.rectilineal),
        '--static': (this.vars.static),
        '--primaryColor': (this.primaryColor),
        '--secondaryColor': (this.secondaryColor),
      }
     }
  },
  methods:{
    handleBeforeChange(event, slick, currentSlide){
    },
    handleAfterChange(event, slick, currentSlide) {
    },
  },
  mounted(){
      this.ready = true;
  }
}
</script>