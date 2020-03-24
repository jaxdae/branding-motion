<template>
<div class="container" :style="cssProps">
  <div
  class="item"
  v-for="card in cardData"
  :key="card.headline"
  >
  <img class="image" :src="card.image">
  <div class="plus"></div>
  <div class="overlay"></div>
  <div class="headline">{{card.headline}}</div>
  <div class="content">{{card.content}}</div>
  </div>
</div>
</template>

<style lang="scss" scoped>
.container{
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  grid-gap: 15px;
  height:100%;
  width:100%;
  padding:90px;
}
.item{
  background:white;
  height:450px;
  width:100%;
  position: relative;
  overflow: hidden;
}
.image{
  object-fit: cover;
  width: 100%;
  height:100%;
  position: relative;
}
.overlay{
  transition: var(--static) all var(--slow);
  position: absolute;
  top:0;
    width: 100%;
    height:100%;
    background: -moz-linear-gradient(bottom, var(--primaryColor) 0%, rgba(0,0,0,0) 100%);
    background: -webkit-linear-gradient(bottom, var(--primaryColor) 0%,rgba(0,0,0,0) 100%);
    background: linear-gradient(to top, var(--primaryColor) 0%,rgba(0,0,0,0) 100%);
    transform:translateY(50%);
}
.plus{
  width: 50px;
  height: 50px;
  background-color: var(--primaryColor);
  border-radius: var(--rectilineal);
  position: absolute;
  bottom:15px;
  left: 15px;
  z-index: +2;
  &::before{
    transition: var(--static) all var(--slow);
    border-radius: var(--rectilineal);
    content: '';
    width:50px;
    height:50px;
    background-color: white;
    position: absolute;
    transform: scale(0);
  }
  &::after{
    transition: var(--static) all var(--slow);
    content:'+';
    color:white;
    font-size: 35px;
    position: absolute;
    margin: 20px 15px;
    line-height: 0;
  }
}
.plus:hover{
  cursor: pointer;
}
.plus:hover.plus::before{
  transform: scale(1);
}
.plus:hover.plus::after{
  color: var(--primaryColor);
}
.plus:hover ~ .headline,
.plus:hover ~ .content,
{
  transform: translateY(-10rem);
  opacity: 1;
}
.plus:hover ~ .overlay{
  transform: translateY(5%);
}
.headline{
  transition: var(--static) all var(--slow);
  position: absolute;
  color:white;
  bottom: 75px;
  left: 15px;
  font-weight:700;
  font-size: 50px;
  letter-spacing: 2px;
  font-family: Barlow Semi Condensed;
  z-index: +1;
}
.content{
  transition: var(--static) all var(--slow);
  position: absolute;
  color:white;
  top: 87%;
  left: 15px;
  z-index: +1;
  line-height: 24px;
  opacity: 0;
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
          image: '/mountain1.jpeg'
        },
        {
          headline: 'Matterhorn',
          content: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod.',
          image: '/mountain2.jpeg'
        },
        {
          headline: 'Iceland',
          content: 'lorem ipsum dolor sit amet',
          image: '/mountain.jpeg'
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
        '--rough': (this.vars.rough),
        '--hard01': (this.vars.hard01),
        '--rectilineal': (this.vars.rectilineal),
        '--static': (this.vars.static),
        '--primaryColor': (this.primaryColor),
        '--secondaryColor': (this.secondaryColor),
      }
     },
  }
}
</script>