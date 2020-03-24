<template>
<span class="container" @mousemove="mousemove" :style="cssProps">
  <a @mouseover="mouseover" @mouseout="mouseout">Hover Me</a>
<div ref="cursor" class="cursor" ></div>
</span>

</template>

<style lang="scss" scoped>
a{
  font-family: Merriweather Sans;
  font-size: 12px;
  color: white;
  letter-spacing: 2px;
  text-transform: uppercase;
  cursor: pointer;
}
.container:hover .cursor{
    display: block;
    position: fixed;
    width: 25px;
    height: 25px;
    background: #f1f2f3;
    border-radius: var(--rectilineal);
    mix-blend-mode: difference;
    pointer-events: none;
}

.cursor.active{
    animation: active_cursor var(--slow) var(--static) forwards 
}

@keyframes active_cursor{
    0%{
        transform: scale(1);
    }

    100%{
        transform: scale(5);
    }
}

.cursor.unactive{
    animation: unactive_cursor var(--slow) var(--static) forwards 
}

@keyframes unactive_cursor{
    0%{
        transform: scale(5);
    }

    100%{
        transform: scale(1);
    }
}

.container{
    width: 100%;
    height: 100%;
    cursor: none;
    display: flex;
    justify-content: center;
    align-items: center;
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
  methods: {
    mousemove(e){
      const x_center = this.$refs.cursor.offsetWidth / 2
      const y_center = this.$refs.cursor.offsetHeight / 2
	    this.$refs.cursor.style.left = `${ e.x - x_center }px`
	    this.$refs.cursor.style.top = `${ e.y - y_center }px`
    },
    mouseover(e) {
      this.$refs.cursor.classList.remove("unactive")
		  this.$refs.cursor.classList.add("active")
    },
    mouseout(e){
      this.$refs.cursor.classList.remove("active")
		  this.$refs.cursor.classList.add("unactive")
    }
  }
}
</script>