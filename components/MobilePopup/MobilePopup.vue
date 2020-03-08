<template>
  <div class="MobilePopup">
    <div class="MobilePopup__window">
      <div class="MobilePopup__close" @click="close"></div>
      <Filters :filteroptions="filteroptions" onHome class="MobilePopup__filters"></Filters>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MobilePopup',
  data() {
    return {
      filteroptions: {
        rational: {
          left: 'rational',
          right: 'emotional'
        },
        innovative: {
          left: 'innovative',
          right: 'traditional'
        },
        maskuline: {
          left: 'maskuline',
          right: 'feminine'
        },
        personal: {
          left: 'personal',
          right: 'institutional'
        },
        serious: {
          left: 'serious',
          right: 'straightforward'
        },
        luxurious: {
          left: 'luxurious',
          right: 'inexpensive'
        },
        delicate: {
          left: 'delicate',
          right: 'sturdy'
        },
        simple: {
          left: 'simple',
          right: 'complex'
        }
      }
    };
  },
  methods: {
    close() {
      document.getElementsByTagName('body')[0].classList.remove('hidden');
      this.$emit('closePopup', true);
    }
  }
};
</script>

<style lang="scss">
@import './MobilePopup.scss';
</style>