<template>
  <button :style="cssProps">{{vars}}</button>

</template>

<style lang="scss" scoped>
button {
  z-index: 1;
  position: relative;
  font-size: inherit;
  font-family: inherit;
  color: white;
  padding: 0.5em 1em;
  outline: none;
  border: none;
  background-color: hsl(236, 32%, 26%);
  overflow: hidden;
  transition: color var(--slow) ease-in-out;
}

button::before {
  content: '';
  z-index: -1;
  position: absolute;
  top: 100%;
  right: 100%;
  width: 1em;
  height: 1em;
  border-radius: 50%;
  background-color: #3cefff;
  transform-origin: center;
  transform: translate3d(50%, -50%, 0) scale3d(0, 0, 0);
  transition: transform var(--slow) ease-in-out;
}

button:hover {
  cursor: pointer;
  color: #161616;
}

button:hover::before {
  transform: translate3d(50%, -50%, 0) scale3d(15, 15, 15);
}
</style>

<script>
export default {
  props: {
    vars: {
      type: Object,
      default: () => {}
    }
  },
  computed: {
     cssProps() { 
       return {
        '--slow': (this.vars.slow) + "s",
        '--rough': (this.vars.rough),
        '--hard': (this.vars.hard),
        '--rectilineal': (this.vars.rectilineal),
        '--static': (this.vars.static),
      }
     }
  }
}
</script>