<template>
  <div class="Home">
    <Hero :sets="curatedCards"></Hero>
    <TopFilter class="Home__topfilter"></TopFilter>
    <div class="Home__wrapper">
      <div class="Home__right">
        <Button
          class="Home__cart"
          :label="'View animation set'"
          :link="'/sets'"
        >
        </Button>
        <Filters :filteroptions="filteroptions" class="Home__filters"></Filters>
      </div>
      <Feed class="Home__left">
      </Feed>
    </div>
    <div style="color:white">{{curatedCards}}</div>
    <Footer></Footer>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex';
import Button from '@/components/Button/Button.vue';
import Hero from '@/components/Hero/Hero.vue';
import Feed from '@/components/Feed/Feed.vue';
import Filters from '@/components/Filters/Filters.vue';
import Footer from '@/components/Footer/Footer.vue';
import TopFilter from '@/components/TopFilter/TopFilter.vue';

export default {
  name: 'Home',
  components: {
    Button,
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
   computed: {
    ...mapState([
      'curatedLoad'
    ]),
    ...mapGetters([
      'curatedCards',
      'sets'
    ]),
  },
  methods: {
    tags(categories, elements) {
      this.elements = elements;
      this.categories = categories;
    }
  },
  mounted() {
    this.$store.dispatch('getCuratedSets');
  }
};
</script>

<style lang="scss">
@import '../styles/views/general.scss';
@import '../styles/views/home.scss';
</style>
