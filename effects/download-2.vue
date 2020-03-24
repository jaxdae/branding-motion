<template>
  <button :style="cssProps" @click="download">
    <div class="color"></div>
    <div class="finished" :class="{done: isDownloadDone}"></div>
    <div class="arrow" :class="{downloading : isDownloading}"></div>
      <div class="text">Download</div>
  </button>
</template>

<style lang="scss" scoped>
button{
  border-radius: var(--rectilineal);
  background-color: transparent;
  border: none;
  position: relative;
  overflow: hidden;
  cursor:pointer;
}

.finished{
  width:51px;
  height: 51px;
  border-radius: var(--rectilineal);
  background-color: var(--secondaryColor);
  position: absolute;
  bottom:51px;
  right:0;
}

.done{
  transition: var(--static) all var(--slow);
  transform: translateY(100%);
  z-index: +2;
}

.finished::before{
  position: absolute;
  z-index: +2;
  content: '';
  top: calc(50% - 7px);
  right: calc(50% - 7px);
  width: 1rem;
  height: 0.625rem;
  border-top: 0.125rem solid #FFFFFF;
  border-right: 0.125rem solid #FFFFFF;
  transform: rotate(135deg);
}

button:hover{
  .arrow{
    transform: translateY(0.5rem);
  }
  .arrow::after{
    opacity: 1;
    transform: rotate(90deg) translateX(-0.1rem);
  }
  .text{
    color: white;
  }
}

.color{
  transition: var(--static) transform var(--slow);
  position: absolute;
  top:0;
  right:0;
  width:51px;
  height:100%;
  border-radius: var(--rectilineal);
  background-color: var(--primaryColor);
}

.text{
  transition: var(--static) all var(--slow);
  position: relative;
  z-index: +1;
  padding: 15px 81px 15px 30px;
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
    right:20px;
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
  right: -0.05rem;
  width: 0.75rem;
  height: 0.125rem;  
  background-color: white;
  transform: rotate(90deg) translateX(-0.2rem) ;
  opacity: 0;
}

.arrow::before{
  position: absolute;
  z-index: +2;
  content: '';
  top: 0;
  right: 0;
  width: 0.625rem;
  height: 0.625rem;
  border-top: 0.125rem solid white;
  border-right: 0.125rem solid white;
  transform: rotate(135deg);
}
.downloading{
  animation: up-down 1.5s infinite;
}
.downloading::after{
  opacity: 1;
}
@keyframes up-down {
  0% {transform: translateY(0.5rem)};
  50% {transform: translateY(0)};
  100% {transform: translateY(0.5rem)};
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
      isDownloading: false,
      isDownloadDone: false
    }
  },
  methods: {
    download() {
      this.isDownloading = true;
      setTimeout(() => 
      {
        this.isDownloadDone = true;
        }, 3000);
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