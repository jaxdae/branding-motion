<template>
  <form :style="cssProps" autocomplete="off">
    <div class="input-wrapper">
      <label class="label text" for="name">First Name</label>
      <input class="textinput" type="text" id="name">
      <span class="underline"></span>
    </div>
  </form> 
</template>

<style lang="scss" scoped>
.input-wrapper{
  position: relative;
  display: inline-flex;
  flex-flow: row wrap;
}
.label{
  font-family: Merriweather Sans;
  color: white;
  font-size: 12px;
  letter-spacing: 2px;
  text-transform: uppercase;
  width:100%;
}
.underline{
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 7px;
  background-color: var(--primaryColor);
  transform-origin: bottom right;
  transform: scaleX(0);
  transition: var(--static) transform var(--slow);
}
.textinput{
  font-family: Merriweather Sans;
  background: var(--primaryColor);
  height: 45px;
  width:100%;
  padding: 10px 15px 10px 15px;
  color: white;
  font-size: 16px;
  background-color: transparent;
  border: 1px solid transparent;
  border-bottom-color: var(--primaryColor);
}
.textinput:focus ~ .underline{
   transform-origin: bottom left;
  transform: scaleX(1);
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