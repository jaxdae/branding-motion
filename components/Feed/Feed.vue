<template>
  <div class="Feed">
    <div v-if="!onList" class="Feed__search-results">
      {{ `${number} results for "${searchTerm}"` }}
    </div>
    <div class="Feed__filter-wrapper">
      <div class="Feed__left">
        <div
          v-for="(filter, index) in $store.getters.activeTagsElements"
          :key="filter.id"
          class="Feed__filter"
        >
          {{ filter }}
          <span @click="removeElement(index)" class="Feed__close"></span>
        </div>
        <div
          v-for="(filter, index) in $store.getters.activeTagsCategories"
          :key="filter.id"
          class="Feed__filter"
        >
          {{ filter }}
          <span @click="removeCategory(index)" class="Feed__close"></span>
        </div>
      </div>
    </div>
    <div v-if="cards && !$store.state.anyFilterSelected" class="Feed__cards">
      <Card
        v-for="(card, index) in cards"
        v-if="initialLoad"
        :key="card.id"
        :id="card.id"
        :name="card.name"
        :tags="card.tags"
        :description="card.description"
        :video="card.video"
        :valueset="getValueSet(index)"
        class="Feed__card"
      >
      </Card>
    </div>
    <div v-else class="Feed__cards">
      <Card
        v-for="(card, index) in allCards"
        v-if="allLoad"
        :key="card.id"
        :id="card.id"
        :name="card.name"
        :tags="card.tags"
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
    },
    onList: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      number: 6,
      searchTerm: 'Hover',
      cards: {},
      allCards: {},
      valueSet: {},
      initialLoad: false,
      allLoad: false,
      initialinitialMaxIndex: null,
      allinitialMaxIndex: null,
    }
  },
  methods: {
    removeElement(index) {
     this.$store.commit('removeTagElements', index);
    },
    removeCategory(index) {
      this.$store.commit('removeTagCategories', index);
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
    getAllAnimations() {
      this.$axios.get('/api/animations/all')
       .then(response => {
        this.allCards = response.data;
        this.allMaxIndex = response.data.length - 1;
        response.data.forEach((animation, index) => {
          this.getTags(animation.id, index, this.allCards, this.allMaxIndex, 'all');
        });
      }).catch((error) => {
        console.log(error)
      })
    },
    getInitialAnimations() {
      this.$axios.get('/api/animations/initial')
       .then(response => {
        this.cards = response.data;
        this.initialMaxIndex = response.data.length - 1;
        response.data.forEach((animation, index) => {
          this.getTags(animation.id, index, this.cards, this.initialMaxIndex, 'initial');
        });
      }).catch((error) => {
        console.log(error)
      })
    },
    getTags(id, index, slot, max, type) {
      this.$axios.get('/api/animationtags/' + id)
       .then(response => {
         slot[index].tags = response.data.map(tag => {
          return tag.name;
        });
        if(index == max && type == 'initial'){
          this.initialLoad = true;
          
        } else if(index == max && type == 'all') {
          this.allLoad = true;
        }
      }).catch((error) => {
        console.log(error);
      })
    }
  },
  mounted() {
    this.getInitialAnimations();
    this.getAllAnimations();
  }
};
</script>

<style lang="scss">
@import './Feed.scss';
</style>
