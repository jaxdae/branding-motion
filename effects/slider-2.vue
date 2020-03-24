<template>
<span class="slider-2">
    <slick
  v-if="ready"
  :style="cssProps"
  ref="slick"
  class="slick"
  @beforeChange="handleBeforeChange"
  @afterChange="handleAfterChange">
      <div v-for="card in cardData" :key="card.headline" class="card">
        <img :src="card.image">
        <div ref="headlines" class="card-content">
          <h1 class="headline headline--outline">{{card.headline}}</h1>
          <h1 ref="headline" class="headline headline--clip">{{card.headline}}</h1>
        </div>
        <p ref="content" class="content">{{card.content}}</p>
      </div>
 </slick>
 </span>
</template>

<style lang="scss">
@import '../styles/slick.scss';
.slider-2{
.slick{
  width:100%;
  height:100%;
  border-radius: 15px;
.card-content{
  transition: all var(--static) var(--slow);
  display:flex;
  position: absolute;
  justify-content: center;
  top:0;
  width:100%;
  height:100%;
}

.card-content.active{
  transition: all var(--static) var(--slow);
  transform: translateY(-3rem);
}

.headline{
  &--outline{
    -webkit-text-stroke: 3px white;
    color: transparent;
  }
  &--clip{
    clip-path: inset(60% 0 0);
    color: white;
  }
  transition: clip-path var(--static) var(--slow);
  
  display:flex;
  position: absolute;
  top:0;
  width:100%;
  height:100%;
  justify-content: center;
  align-items: center;
  font-weight:700;
  font-size: 130px;
  letter-spacing: 10px;
  text-transform: uppercase;
  font-family: Barlow Semi Condensed;

}
.headline--clip.active{
  clip-path: inset(40% 0 0 0);
}
.content{
  text-align: center;
  color:white;
  position: absolute;
  top:61%;
  width:80%;
  opacity: 0;
  line-height:24px;
}
.content.active{
  opacity: 1;
  transition: all var(--static) var(--slow);
  transform: translateY(-3rem);
  transition-delay: var(--slow2);
}
.card{
  display: flex !important;
  justify-content: center;
  position: relative;
  height:700px;
    &::before{
    content:'';
    width:100%;
    height:100%;
    top:0;
    position: absolute;
    opacity: 0.6;
background: -moz-radial-gradient(center, circle cover,  var(--primaryColor) 0%,rgba(0,0,0,0) 100%);
background: -webkit-radial-gradient(center, circle cover,  var(--primaryColor) 0%, rgba(0,0,0,0) 100%);
background: radial-gradient(circle at center,  var(--primaryColor) 0%, rgba(0,0,0,0) 100%); 
  }
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
@keyframes move-up{
  0% {transform: translateY(0)}
  100% {transform: translateY(1rem)}
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
       this.$refs.headline.forEach(headline => {
        headline.classList.remove('active');
      })
      this.$refs.headlines.forEach(headlines => {
        headlines.classList.remove('active');
      })
      this.$refs.content.forEach(content => {
        content.classList.remove('active');
      })
    },
    handleAfterChange(event, slick, currentSlide) {
        this.$refs.headline[currentSlide].classList.add('active');
        this.$refs.headlines[currentSlide].classList.add('active');
        this.$refs.content[currentSlide].classList.add('active');
    },
  },
  mounted(){
      this.ready = true;
      // this.$refs.headline[0].classList.add('active');
      // this.$refs.headlines[0].classList.add('active');
      // this.$refs.content[0].classList.add('active');
  }
}
</script>