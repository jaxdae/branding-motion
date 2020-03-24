<template>
  <button :style="cssProps">
    <div class="wrapper">
      <div class="color"></div>
    </div>
    <div class="arrow"></div>
    <div class="text">Text Button</div>
  </button>
</template>

<style lang="scss" scoped>
@import '../styles/slick.scss';

button{
  border-radius: var(--rectilineal);
  background: transparent;
  border: none;
  position: relative;
  //overflow: hidden;
  cursor:pointer;
}

button:hover{
  .color{
    transform: translateX(0);
  }
  .arrow{
    transform: translateX(1rem);
  }
  .arrow::after{
    opacity: 1;
    transform: translateX(0);
  }
  .arrow::before{
    opacity: 1;
  }
  .text{
    color: white;
  }
}

.wrapper{
  position: absolute;
  height:100%;
  width:100%;
  overflow: hidden;
}

.color{
  transition: var(--static) transform var(--slow);
  position: absolute;
  bottom:0;
  left:0;
  width:100%;
  height:70%;
  border-radius: var(--rectilineal);
  background-color: var(--primaryColor);
  transform: translateX(-101%);
}

.text{
  transition: var(--static) all var(--slow);
  position: relative;
  z-index: +1;
  padding: 0 0 5px 15px;
  color: rgba(255, 255, 255, 0.8);
  font-size: 16px;
  letter-spacing: 2.5px;
  font-weight: bold;
  text-transform: uppercase;
}

.arrow {
    transition: var(--static) transform var(--slow);
    position: absolute;
    top: calc(50% - 6px);
    right: -20px;
    width: 100%;
    height: 100%;
}

.arrow::after{
  transition: var(--static) all var(--slow);
  content: '';
  position: absolute;
  z-index: +2;
  top: 0.25rem;
  right: 0;
  width: 0.75rem;
  height: 0.125rem;  
  background: white;
  transform: translateX(-0.2rem);
  opacity: 0;
}

.arrow::before{
  transition: var(--static) all var(--slow);
  position: absolute;
  z-index: +2;
  content: '';
  top: 0;
  right: 0;
  width: 0.625rem;
  height: 0.625rem;
  border-top: 0.125rem solid #fff;
  border-right: 0.125rem solid #fff;
  transform: rotate(45deg);
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
     }
  }
}
</script>