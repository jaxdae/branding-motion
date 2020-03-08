<template>
  <div class="EmptyPlaceholder">
    <div class="EmptyPlaceholder__caps">{{ subheadline }}</div>
    <div class="EmptyPlaceholder__headline">{{ headline }}</div>
    <div class="EmptyPlaceholder__description">{{ body }}</div>
    <div
      v-if="type == 'Animation' || type == 'Search'"
      class="EmptyPlaceholder__button-wrapper"
    >
      <Button v-if="type == 'Animation'" class="EmptyPlaceholder__button EmptyPlaceholder__button--explore" link="/" label="Explore all animations"></Button>
      <Button v-if="type == 'Animation'" class="EmptyPlaceholder__button EmptyPlaceholder__button--back" link="/sets" label="Back to set overview"></Button>
      <Button
        v-if="type == 'Search'"
        class="EmptyPlaceholder__button EmptyPlaceholder__button--explore"
        link="/"
        label="Reset all filters"
        @click.native="resetAllFilters"
      >
      </Button>
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
    },
    subheadline:{
      type: String,
      default: 'No sets found'
    },
    headline: {
      type: String,
      default: "Oops! Looks like you haven't created or imported any sets yet!",
    },
    body: {
      type: String,
      default: "Get started by importing or adding a new set. If you want to get inspiration check out the pre-curated sets below!"
    }
  },
  methods: {
    resetAllFilters(){
      this.$store.commit('resetAllTags');
    }
  },
};
</script>

<style lang="scss">
@import './EmptyPlaceholder.scss';
</style>
