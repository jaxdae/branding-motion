<template>
  <div class="Feed">
    <div class="Feed__search-results">
      {{ `${number} results for "${searchTerm}"` }}
    </div>
    <div class="Feed__filter-wrapper">
      <div class="Feed__left">
        <div
          v-for="(filter, index) in elements"
          :key="filter.id"
          class="Feed__filter"
        >
          {{ filter }}
          <span @click="removeElement(index)" class="Feed__close"></span>
        </div>
        <div
          v-for="(filter, index) in categories"
          :key="filter.id"
          class="Feed__filter"
        >
          {{ filter }}
          <span @click="removeCategory(index)" class="Feed__close"></span>
        </div>
      </div>
    </div>
    <div class="Feed__cards">
      <Card
        v-for="(card, index) in cards"
        :key="card.id"
        :id="card.id"
        :name="card.name"
        :description="card.description"
        :video="card.video"
        :valueset="getValueSet(index)"
        class="Feed__card"
      >
      </Card>
    </div>
  </div>
</template>

<script>
import '../../assets/fonts/iconfont.scss';
import Card from '../AnimationCard/AnimationCard';

export default {
  name: 'Feed',
  components: {
    Card
  },
  props: {
    elements: {
      type: Array,
      default: () => []
    },
    categories: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      number: 6,
      searchTerm: 'Hover',
      cards: [],
      valueSet: {}
    };
  },
  methods: {
    removeElement(index) {
      this.elements.splice(index, 1);
    },
    removeCategory(index) {
      this.categories.splice(index, 1);
    },
    getValueSet(index){
      return {
        rational: this.cards[index].rational,
        innovative: this.cards[index].innovative,
        personal: this.cards[index].personal,
        maskuline: this.cards[index].maskuline,
        serious: this.cards[index].serious,
        luxurious: this.cards[index].luxurious,
        delicate: this.cards[index].delicate,
        simple: this.cards[index].simple,
      }
    },
    getAnimations() {
      this.$axios.get('/api/animations')
       .then(response => {
        this.cards = response.data;
      }).catch((error) => {
        console.log(error)
      })
    },
  },
  mounted() {
    this.getAnimations();
  }
};
</script>

<style lang="scss">
@import './Feed.scss';
</style>
