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
        v-for="card in cards"
        :key="card.id"
        :id="card.id"
        :name="card.name"
        :description="card.description"
        :tags="card.tags"
        :video="card.video"
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
      cards: {
        firstCard: {
          id: 1,
          name: 'Button background expand hover effect',
          description:
            'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy dolor sit amet dolor.',
          tags: ['Button', 'Hover'],
          video: require('../../assets/videos/animation.mp4')
        },
        secondCard: {
          id: 2,
          name: 'Button background expand hover effect',
          description:
            'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy dolor sit amet dolor.',
          tags: ['Button', 'Hover'],
          video: require('../../assets/videos/animation.mp4')
        },
        thirdCard: {
          id: 3,
          name: 'Button background expand hover effect',
          description:
            'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy dolor sit amet dolor.',
          tags: ['Button', 'Hover'],
          video: require('../../assets/videos/animation.mp4')
        }
      }
    };
  },
  methods: {
    removeElement(index) {
      this.elements.splice(index, 1);
    },
    removeCategory(index) {
      this.categories.splice(index, 1);
    }
  }
};
</script>

<style lang="scss">
@import './Feed.scss';
</style>
