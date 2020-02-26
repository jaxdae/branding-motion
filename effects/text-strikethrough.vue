<template>
<span>Strikethrough</span>
</template>

<style scoped>
span {
  position: relative;
}

span::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 0;
  right: 0;
  height: 3px;
  background-color: #fc2f70;
  transform-origin: center right;
  transform: scaleX(0) translateY(-50%);
  transition: transform 0.3s ease;
}

span:hover {
  color: black;
}

span:hover::before {
  transform-origin: center left;
  transform: scaleX(1) translateY(-50%);
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
        //'--rough': (this.vars.rough),
        '--hard01': (this.vars.hard01),
        '--hard02': ('0 0 10px 10px'),
        //'--rectilineal': (this.vars.rectilineal),
        '--static': (this.vars.static),
        '--primaryColor': (this.primaryColor),
        '--secondaryColor': (this.secondaryColor),
      }
     }
  }
}
</script>