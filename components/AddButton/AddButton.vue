<template>
  <div class="AddButton" @click="submit">{{text}}</div>
</template>

<script>
import '../../assets/fonts/iconfont.scss';
import { mapGetters } from 'vuex';
export default {
  name: 'AddButton',
  props: {
    card: {
      type: Object,
      default: () => {}
    }
  },
  computed: {
    text() {
      if(this.card.default == 1){
        return 'Add animation'
      }else {
        return 'Save animation'
      }
    },
    ...mapGetters({
      currentVariables: 'animationdetail/currentVariables'
    }),
  },
  data() {
    return {};
  },
  methods: {
    submit() {
      if(this.card.default == 1){
        //this.$store.dispatch('saveToSet', this.card.id)
      }else {
        let req = this.currentVariables;
        req.id = this.card.id;

        this.$store.dispatch('animationdetail/updateAnimation', req)
      }
    }
  }
};
</script>

<style lang="scss">
@import './AddButton.scss';
</style>
