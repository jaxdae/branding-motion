<template>
  <div class="EmptyPlaceholder">
    <div class="EmptyPlaceholder__caps">No animations found</div>
    <div class="EmptyPlaceholder__headline">Oops! Looks like you haven't saved any animations yet!</div>
    <div class="EmptyPlaceholder__description">Get started by exploring all animations or go back to the set overview</div>
    <div class="EmptyPlaceholder__button-wrapper">
      <Button class="EmptyPlaceholder__button EmptyPlaceholder__button--explore" link="/" label="Explore all animations"></Button>
      <Button class="EmptyPlaceholder__button EmptyPlaceholder__button--back" link="/sets" label="Back to set overview"></Button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'EmptyPlaceholder',
  components: {},
  props: {
    type:{
      type: String,
      default: 'Set'
    }
  },
  data() {
    return {
    };
  },
  methods: {
  },
};
</script>

<style lang="scss">
@import './EmptyPlaceholder.scss';
</style>
