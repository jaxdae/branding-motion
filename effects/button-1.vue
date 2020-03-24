<template>
<span class="button" :style="cssProps">
  <div class="text text-old">Text Button</div>
  <div class="text text-new">Text Button</div>
    <svg class="svg" xmlns="http://www.w3.org/2000/svg">
    
    <rect class="rect rect--1"/>
    <rect class="rect rect--2"/>
    <rect class="rect rect--3"/>
    <rect class="rect rect--4"/>
  </svg>
</span>
</template>

<style lang="scss" scoped>
.svg{
  position: absolute;
  width: calc(100% + 4px);
  height:calc(100% + 30px);
  top:-15px;
  left:-2px;
}
.rect{
  transition: var(--static) all var(--slow);
  fill: transparent;
  stroke: var(--secondaryColor);
  stroke-width: 4px;
  box-sizing: border-box;
  width:100%;
  height:58px;
  stroke-dasharray: 30 484;
  opacity: 0;
}
.rect--1, .rect--3{
   stroke-dashoffset: 400px + 25px;
}
.rect--2, .rect--4{
  stroke-dashoffset: -400px + 58px;
}
.button{
  position: relative;
  padding: 5px 30px;
  border: 2px solid white;
  border-top: none;
  border-bottom: none;
  overflow: visible;
  width:200px;
}
.button:hover{
  cursor: pointer;
  .text{
    transform: translateY(-1rem);
  }
  .text-old{
    opacity: 0;
  }
  .text-new{
    opacity: 1;
    color: var(--secondaryColor);
  }
  .rect{
    opacity: 1;
  }
  .rect--1{
    stroke-dashoffset: 300px;
  }
  .rect--2{
    stroke-dashoffset: -300px + 58px + 30px;
  }
  .rect--3{
    stroke-dashoffset: 556px;
  }
  .rect--4{
    stroke-dashoffset: -472px;
  }
}
.text{
  transition: var(--static) all var(--slow);
  font-size: 16px;
  letter-spacing: 2px;
  font-weight: bold;
  text-transform: uppercase;
  color:white;
}
.text-new{
  position: absolute;
  transform: translateY(1rem);
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