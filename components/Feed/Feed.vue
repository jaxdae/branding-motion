<template>
  <div class="Feed">
    <transition name="fade-in-up">
      <div v-show="!onList && searchTerm" class="Feed__search-results">
        {{ `${number} results for "${searchTerm}"` }}
      </div>
    </transition>
    <div class="Feed__filter-wrapper">
        <transition-group class="Feed__transition" name="fade-in-left" tag="div">
          <div
            v-for="(filter, index) in $store.getters.activeTagsElements"
            :key="filter"
            class="Feed__filter"
          >
            {{ filter }}
            <span @click="removeElement(index)" class="Feed__close"></span>
          </div>
        </transition-group>
        <transition-group class="Feed__transition" name="fade-in-left">
          <div
            v-for="(filter, index) in $store.getters.activeTagsCategories"
            :key="filter"
            class="Feed__filter"
          >
            {{ filter }}
            <span @click="removeCategory(index)" class="Feed__close"></span>
          </div>
        </transition-group>
    </div>
    <div class="Feed__cards">
       <transition-group name="flip-list" tag="div" class="Feed__transition-group">
      <Card
        v-for="card in filteredCards"
        v-if="allLoad"
        :key="card.id"
        :id="card.id"
        :name="card.name"
        :tags="card.tags"
        :description="card.description"
        :video="card.video"
        :valueset="card.valueset"
        class="Feed__card"
      >
      </Card>
       </transition-group>
       <preloader v-if="!allLoad" class="Feed__preloader"></preloader>
       <empty-placeholder
        type="Search"
        v-if="filteredCards.length < 1"
        subheadline="No animations found"
        headline="Oops! Looks like your search didn't score any results!"
        body="Try typing in a different search term, delete some tags or reset the whole filter"
      ></empty-placeholder>
    </div>
  </div>
</template>

<script>
import '../../assets/fonts/iconfont.scss';
import { mapState, mapGetters } from 'vuex';

export default {
  name: 'Feed',
  props: {
    onList: {
      type: Boolean,
      default: false
    },
    allCards: {
      type: Array,
      default: () => []
    },
    allLoad: {
      type: Boolean,
      default: false,
    }
  },
  data() {
    return {
      number: null,
      postsToShow: 10,
    }
  },
  computed: {
    ...mapState([
      'activeTagsCategories',
      'activeTagsElements',
      'anyFilterSelected'
    ]),
    ...mapGetters([
      'searchTerm',
      'activeSearch',
      'activeElement',
      'activeCategory',
    ]),
      filteredCards() {
      if(this.activeSearch){
        let searchedCards = {};
        this.allCards.forEach((card, index) => {
          if(card.name.includes(this.searchTerm)){
          searchedCards[index] = card;
          }
        })
        if(this.activeElement && !this.activeCategory || this.activeCategory && !this.activeElement){
          if(this.activeElement){
            let searchedElementCards = {};
            Object.values(searchedCards).forEach((card, index) => {
              card.tags.forEach(tag => {
                if(this.activeTagsElements.includes(tag)){
                  searchedElementCards[index] = card;
                }
              })
            })
            this.number = Object.values(searchedElementCards).length;
            let sorted = Object.values(searchedElementCards).sort((a,b) => {
            return parseFloat(a.score) - parseFloat(b.score);
          })
            return sorted;
          }
          else {
            let searchedCategoryCards = {};
            Object.values(searchedCards).forEach((card, index) => {
              card.tags.forEach(tag => {
                if(this.activeTagsCategories.includes(tag)){
                  searchedCategoryCards[index] = card;
                }
              })
            })
            this.number = Object.values(searchedCategoryCards).length;
            let sorted = Object.values(searchedCategoryCards).sort((a,b) => {
            return parseFloat(a.score) - parseFloat(b.score);
          })
            return sorted;
          }
        }
        else if(this.activeElement && this.activeCategory){
          let searchedElementCards = {};
          Object.values(searchedCards).forEach((card, index) => {
            card.tags.forEach(tag => {
              if(this.activeTagsElements.includes(tag)){
                searchedElementCards[index] = card;
              }
            })
          })
          let searchedElementCategoryCards = {};
          Object.values(searchedElementCards).forEach((card, index) => {
            card.tags.forEach(tag => {
              if(this.activeTagsCategories.includes(tag)){
                searchedElementCategoryCards[index] = card;
              }
            })
          })
          this.number = Object.values(searchedElementCategoryCards).length;
            let sorted = Object.values(searchedElementCategoryCards).sort((a,b) => {
            return parseFloat(a.score) - parseFloat(b.score);
          })
            return sorted;
        }
        else{
          this.number = Object.values(searchedCards).length;
          let sorted = Object.values(searchedCards).sort((a,b) => {
            return parseFloat(a.score) - parseFloat(b.score);
          })
          return sorted;
        }
      }
      else {
        if(this.activeElement && !this.activeCategory || this.activeCategory && !this.activeElement){
          if(this.activeElement){
            let elementCards = {};
             this.allCards.forEach((card, index) => {
              card.tags.forEach(tag => {
                if(this.activeTagsElements.includes(tag)){
                  elementCards[index] = card;
                }
              })
            })
            let sorted = Object.values(elementCards).sort((a,b) => {
              return parseFloat(a.score) - parseFloat(b.score);
            })
            return sorted;
          }
          else {
            let categoryCards = {};
              this.allCards.forEach((card, index) => {
              card.tags.forEach(tag => {
                if(this.activeTagsCategories.includes(tag)){
                  categoryCards[index] = card;
                }
              })
            })
            let sorted = Object.values(categoryCards).sort((a,b) => {
              return parseFloat(a.score) - parseFloat(b.score);
            })
            return sorted;
          }
        }
        else if(this.activeElement && this.activeCategory){
          let elementCategoryCards = {};
          let elementCards = {};
          this.allCards.forEach((card, index) => {
              card.tags.forEach(tag => {
              if(this.activeTagsElements.includes(tag)){
                  elementCards[index] = card;
              }
            })
          })
          Object.values(elementCards).forEach((card, index) => {
            card.tags.forEach(tag => {
              if(this.activeTagsCategories.includes(tag)){
                  elementCategoryCards[index] = card;
              }
            })
          })
          let sorted = Object.values(elementCategoryCards).sort((a,b) => {
              return parseFloat(a.score) - parseFloat(b.score);
            })
          return sorted;
        }
        else{
          let localAllCards = {};
          localAllCards = this.allCards;
          let sorted = Object.values(localAllCards).sort((a,b) => {
            return parseFloat(a.score) - parseFloat(b.score);
          })
          return sorted.splice(0,this.postsToShow);
        }
      }
      
    },
  },
  methods: {
    removeElement(index) {
     this.$store.commit('removeTagElements', index);
     this.$store.commit('disableFilter');
     this.$store.commit('deactivateElement');
    },
    removeCategory(index) {
      this.$store.commit('removeTagCategories', index);
      this.$store.commit('disableFilter');
      this.$store.commit('deactivateCategory');
    }
  },
  mounted() {
    window.onscroll = () => {
  let bottomOfWindow = document.documentElement.scrollTop + window.innerHeight === document.documentElement.offsetHeight;

  if (bottomOfWindow) {
    this.postsToShow += 10;
  }
};
  }
};
</script>

<style lang="scss">
@import './Feed.scss';
</style>
