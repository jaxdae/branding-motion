<template>
  <form :style="cssProps" autocomplete="off">
    <input class="checkbox" type="checkbox" id="checkbox">
    <label class="label" for="checkbox">I agree to the terms</label>
  </form>
</template>

<style lang="scss" scoped>
.checkbox{
  display:none;
}
.label {
  transition: var(--static) transform var(--slow);
  position: relative;
  width: auto;
  padding-left: 10px;
  margin:25px;
  font-family: Merriweather Sans;
  font-size: 12px;
  color: white;
  letter-spacing: 2px;
  text-transform: uppercase;
}
.label::before {
  content: "";
  transition: var(--static) transform var(--slow);
  background: var(--primaryColor);
  width: 20px;
  height: 20px;
  position: absolute;
  left: -25px;
  top: -3px;
}
.label::after {
  content: "";
  transition: var(--static) transform var(--slow);
  background: var(--secondaryColor);
  position: absolute;
  height: 8px;
  width: 8px;
  left: -19px;
  top: 3px;
  transform: scale(0);
}
.checkbox:checked + .label::after {
  transform: scale(1);
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