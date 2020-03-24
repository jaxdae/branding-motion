<template>
  <button :style="cssProps">
    <div class="color"></div>
    <div class="arrow"></div>
    <div class="text">Text Button</div>
  </button>
</template>

<style lang="scss" scoped>
button{
  border-radius: var(--rectilineal);
  background: transparent;
  border: none;
  position: relative;
  overflow: hidden;
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
  .text{
    color: white;
  }
}

.color{
  transition: var(--static) transform var(--slow);
  position: absolute;
  top:0;
  left:0;
  width:100%;
  height:100%;
  border-radius: var(--rectilineal);
  background-color: var(--primaryColor);
  transform: translateX(calc(-100% + 51px));
}

.text{
  transition: var(--static) all var(--slow);
  position: relative;
  z-index: +1;
  padding: 15px 30px 15px 81px;
  color: rgba(255, 255, 255, 0.8);
  font-size: 16px;
  letter-spacing: 2px;
  font-weight: bold;
  text-transform: uppercase;
}

.arrow {
    transition: var(--static) transform var(--slow);
    position: absolute;
    top: calc(50% - 6px);
    left: 17px;
    width: 100%;
    height: 100%;
    background: none;
}

.arrow::after{
  transition: var(--static) all var(--slow);
  content: '';
  position: absolute;
  z-index: +2;
  top: 0.25rem;
  left: -0.2rem;
  width: 0.75rem;
  height: 0.125rem;  
  background: white;
  transform: translateX(-0.2rem);
  opacity: 0;
}

.arrow::before{
  position: absolute;
  z-index: +2;
  content: '';
  top: 0;
  left: 0;
  width: 0.625rem;
  height: 0.625rem;
  border-top: 0.125rem solid #fff;
  border-right: 0.125rem solid #fff;
  transform: rotate(45deg);
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