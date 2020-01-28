<template>
  <div class="Detail">
    <HeroSmall :animation="card" :tags="tags"></HeroSmall>
    <top-filter></top-filter>
    <div class="Detail__wrapper">
      <transition-group name="fade-in" mode="out-in" :class="{ collapsed: !isCollapsed }" class="Detail__brandtraits">
        <filters
          :filteroptions="brandtraits"
          :valueset="valueSet"
          :key=1
          @isCollapsed="collapse"
          collapse
          class="Detail__background"
        >
        </filters>
      </transition-group>
      <Effect
        :type="effect.type"
        :class="{ wider: !isCollapsed }"
        class="Detail__animation"
      >
        <!-- eslint-disable-next-line vue/require-component-is -->
        <component
          :is="effect.name"
          class="Detail__component"
        />
        <div @click="switchView" class="Detail__switcher"></div>
        <AddButton></AddButton>
      </Effect>
      <div class="Detail__left">
        <Cart class="Detail__cart"></Cart>
        <filters
          v-if="designerView"
          :filteroptions="filteroptions"
          :name="'Adjustments'"
          class="Detail__adjustments"
        >
        </filters>
        <Code
          v-else
          :html="effect.html"
          :css="effect.css"
        >
        </Code>
      </div>
    </div>
    <cross-ref-slider :cards="crossRefs"></cross-ref-slider>
    <Footer></Footer>
  </div>
</template>

<script>
import AddButton from '@/components/AddButton/AddButton.vue';
import HeroSmall from '@/components/HeroSmall/HeroSmall.vue';
import Cart from '@/components/Cart/Cart.vue';
import Code from '@/components/Code/Code.vue';
import Footer from '@/components/Footer/Footer.vue';
import Effect from '@/components/Effect/Effect.vue';
import CrossRefSlider from '@/components/CrossRefSlider/CrossRefSlider.vue';
import TopFilter from '@/components/TopFilter/TopFilter.vue';
import Filters from '@/components/Filters/Filters.vue';
import { components, effects } from '@/assets/effects.js';

export default {
  name: 'Detail',
  components: {
    AddButton,
    Cart,
    Code,
    CrossRefSlider,
    HeroSmall,
    TopFilter,
    Effect,
    Filters,
    Footer,
    ...components
  },
  data() {
    return {
      name: '',
      isCollapsed: true,
      designerView: true,
      effect: {},
      effects,
      card: {},
      cards: [],
      tags: [],
      crossRefs: [],
      valueSet: {},
      filteroptions: {
        slow: {
          left: 'slow',
          right: 'fast'
        },
        rough: {
          left: 'rough',
          right: 'smooth'
        },
        rational: {
          left: 'hard edge',
          right: 'soft edge'
        },
        sharp: {
          left: 'sharp',
          right: 'blurry'
        },
        rectilineal: {
          left: 'rectilineal',
          right: 'arched'
        },
        static: {
          left: 'static',
          right: 'flexible'
        }
      },
      brandtraits: {
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
    collapse(isCollapsed) {
      this.isCollapsed = isCollapsed;
    },
    switchView() {
      if (this.designerView) {
        this.designerView = false;
      } else {
        this.designerView = true;
      }
    },
    getValueSet() {
      this.valueSet = {
        rational: this.card.rational,
        innovative: this.card.innovative,
        personal: this.card.personal,
        maskuline: this.card.maskuline,
        serious: this.card.serious,
        luxurious: this.card.luxurious,
        delicate: this.card.delicate,
        simple: this.card.simple,
      }
    },
    getAnimation() {
      this.$axios.get('/api/animations/' + this.$route.params.detail)
       .then(response => {
          this.card = response.data;
          this.getCode();
          this.getValueSet();
      }).catch((error) => {
        console.log(error)
      })
    },
    getTags() {
      this.$axios.get('/api/animationtags/' + this.$route.params.detail)
       .then(response => {
         this.tags = response.data.map(tag => {
          return tag.name;
        })
      }).catch((error) => {
        console.log(error);
      })
    },
    getCode() {
      Object.values(effects).forEach(effect => {
        if(effect.name == this.card.componentName){
          this.effect = effect;
        };
      })
    },
    getCrossRefs() {
      this.$axios.get('/api/crossrefs/' + this.$route.params.detail)
       .then(response => {
         this.crossRefs = response.data;
      }).catch((error) => {
        console.log(error);
      })
    }
  },
  mounted() {
    this.getAnimation();
    this.getTags();
    this.getCrossRefs();
  }
};
</script>
<style lang="scss">
@import '../styles/views/general.scss';
@import '../styles/views/detail.scss';
</style>
