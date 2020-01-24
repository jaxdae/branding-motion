<template>
  <div class="Home">
    <Hero></Hero>
    <TopFilter @tags="tags" class="Home__topfilter"></TopFilter>
    <div class="Home__wrapper">
      <div class="Home__right">
        <Cart class="Home__cart"></Cart>
        <Filters :filteroptions="filteroptions" class="Home__filters"></Filters>
      </div>
      <Feed :elements="elements" :categories="categories" class="Home__left">
      </Feed>
    </div>
    <Footer></Footer>
  </div>
</template>

<script>
import Cart from '@/components/Cart/Cart.vue';
import Hero from '@/components/Hero/Hero.vue';
import Feed from '@/components/Feed/Feed.vue';
import Filters from '@/components/Filters/Filters.vue';
import Footer from '@/components/Footer/Footer.vue';
import TopFilter from '@/components/TopFilter/TopFilter.vue';

export default {
  name: 'Home',
  components: {
    Cart,
    Hero,
    Feed,
    Filters,
    Footer,
    TopFilter
  },
  data() {
    return {
      elements: [],
      categories: [],
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
    tags(categories, elements) {
      this.elements = elements;
      this.categories = categories;
    }
  }
};
</script>

<style lang="scss">
@import '../styles/views/home.scss';
</style>
