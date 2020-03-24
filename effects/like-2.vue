<template>
<div :style="cssProps" :class="{active: liked}" class="container">
  <a class="fav" @click="like">
    <svg class="stableHeart" viewBox="-1 0 18 15" :class="{filled: liked}">
     <defs>
      <path d="M16 4.872c0-4.9-6.894-5.8-8 .695C6.81-.928 0-.027 0 5.25c0 5.274 8 9.697 8 9.697s8-5.177 8-10.075z" id="heartPath"/>
     </defs>
     <use xlink:href="#heartPath" />
    </svg>
  </a>
</div>
</template>

<style lang="scss" scoped>

.stableHeart {
  transition: var(--static) all var(--slow);
  width: 60px;
  stroke: var(--primaryColor);
  fill: transparent;
}

.stableHeart:hover {
  cursor: pointer;
  stroke: var(--secondaryColor);
}

.active{
  animation: 1.5s pulse forwards;
}

.filled{
  transition: var(--static) all var(--slow);
  fill: var(--secondaryColor);
  stroke: var(--secondaryColor);
}

@keyframes pulse {
  20% { transform: scale(1); }
  30%{ transform: scale(1.2); }
  35% { transform: scale(1); }
  40% { transform: scale(1.5); }
  60% { transform: scale(1); }
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
    return {
      liked: false
    }
  },
  methods: {
    like() {
      this.liked = (this.liked) ? false : true;
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