<template>
  <span class="container" :style="cssProps">
    <div class="wrapper">
      <button class="accordion" @click="toggleSection(0)">Section 1</button>
      <div class="arrow"></div>
    </div>
    <div class="panel">
      <p>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum.</p>
    </div>
    <div class="wrapper">
      <button class="accordion" @click="toggleSection(1)">Section 2</button>
      <div class="arrow"></div>
    </div>
    <div class="panel">
      <p>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.</p>
    </div>
    <div class="wrapper">
      <button class="accordion" @click="toggleSection(2)">Section 2</button>
      <div class="arrow"></div>
    </div>
    <div class="panel">
      <p>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Sit amet.</p>
    </div>
  </span>
</template>

<style lang="scss" scoped>
.container{
  width:80%;
}
.wrapper{
  position: relative;
}
.accordion {
  border: 1px solid var(--primaryColor);
  background-color: transparent;
  font-family: Merriweather Sans;
  font-size: 12px;
  color: white;
  letter-spacing: 2px;
  text-transform: uppercase;
  cursor: pointer;
  padding: 18px;
  width: 100%;
  text-align: left;
  outline: none;
  font-size: 15px;
  transition: 0.4s;
  position: relative;
}
.accordion::before{
  transition: var(--static) transform var(--slow);
  content: '';
  position: absolute;
  background-color: var(--primaryColor);
  width: 100%;
  height: 100%;
  z-index: -1;
  top:0;
  left:0;
  transform: translateX(-101%);
}
.accordion::after{
  transition: var(--static) transform var(--slow);
  content: '';
  position: absolute;
  background-color: var(--primaryColor);
  width: 100%;
  height: 10%;
  z-index: -1;
  bottom:0;
  left:0;
  transform: translateX(-101%);
}
.panel {
  padding: 0 18px;
  color: white;
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.2s ease-out;
}
p{
  padding:30px 0;
  line-height: 24px;
}
.arrow {
  pointer-events: none;
    transition: var(--static) transform var(--slow);
    position: absolute;
    top: calc(50% - 6px);
    right: 20px;
    width: 12px;
    height: 12px;
    background: none;
}
.arrow::after{
  transition: var(--static) all var(--slow);
  content: '';
  position: absolute;
  top: 0.25rem;
  right: 0.05rem;
  width: 0.75rem;
  height: 0.125rem;  
  background: white;
  transform: rotate(90deg) translateX(-0.2rem);
  opacity: 0;
}
.arrow::before{
  position: absolute;
  content: '';
  top: 0;
  width: 0.625rem;
  height: 0.625rem;
  border-top: 0.125rem solid #fff;
  border-right: 0.125rem solid #fff;
  transform: rotate(135deg);
}
.accordion:hover::after{
  transform: translateX(0);
}
.active ~ .arrow{
  transform: rotate(180deg);
}
.active.accordion.accordion:hover ~ .arrow {
  transform: rotate(180deg) translateY(0.25rem);
}
.accordion:hover ~ .arrow{
  transform: translateY(0.25rem);
}
.accordion:hover ~ .arrow::after{
  opacity: 1;
}
.active::before{
  transform: translateX(0);
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
  methods: {
    toggleSection(index) {
      let sections = [...document.getElementsByClassName('accordion')];
      let panels = [...document.getElementsByClassName('panel')];
      sections[index].classList.toggle('active');
      if(panels[index].style.maxHeight){
        panels[index].style.maxHeight = null;
      } else {
        panels[index].style.maxHeight = panels[index].scrollHeight + 'px';
      }
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