<template>
  <div class="Detail">
    <HeroSmall :animation="card" :tags="card.tags"></HeroSmall>
    <top-filter isDetail></top-filter>
    <div class="Detail__wrapper" v-if="cardLoad">
      <filters
        :filteroptions="brandtraits"
        :valueset="card.valueSet"
        :key=1
        @isCollapsed="collapse"
        collapse
        isValueSet
        isLocked
        noLockIcon
        class="Detail__background"
      >
      </filters>
      <Effect
        :type="card.effect.type"
        :class="{ wider: !isCollapsed }"
        class="Detail__animation"
      >
        <component
          :is="card.effect.name"
          class="Detail__component"
        />
        <div @click="switchView" class="Detail__switcher"></div>
        <Button
          class="Detail__add"
          :link="'/sets/95'"
          :label="buttonText"
          @click.native="addOrSave"
        ></Button>
      </Effect>
      <div class="Detail__left">
        <Button
          class="Detail__cart"
          :label="'View animation set'"
          :link="'/sets'"
        >
        </Button>
        <filters
          v-if="designerView"
          :filteroptions="filteroptions"
          :name="'Adjustments'"
          class="Detail__adjustments"
          isVariables
          :variables="card.variables"
        >
        </filters>
        <Code
          v-else
          class="Detail__code"
          :html="card.effect.html"
          :css="card.effect.css"
        >
        </Code>
      </div>
    </div>
    <cross-ref-slider
      v-if="crossrefCards"
      :cards="crossrefCards"
      :subheadline="'Discover more animations'"
      :headline="'Want to complete your set?'"
    >
    </cross-ref-slider>
    <Footer></Footer>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex';
import { components, effects } from '@/assets/effects.js';
import HeroSmall from '@/components/HeroSmall/HeroSmall.vue';
import Button from '@/components/Button/Button.vue';
import Code from '@/components/Code/Code.vue';
import Footer from '@/components/Footer/Footer.vue';
import Effect from '@/components/Effect/Effect.vue';
import CrossRefSlider from '@/components/CrossRefSlider/CrossRefSlider.vue';
import TopFilter from '@/components/TopFilter/TopFilter.vue';
import Filters from '@/components/Filters/Filters.vue';

export default {
  name: 'Detail',
  components: {
    Button,
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
      filteroptions: {
        slow: {
          left: 'slow',
          right: 'fast'
        },
        rough: {
          left: 'rough',
          right: 'smooth'
        },
        hard: {
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
  computed: {
    ...mapGetters({
      crossrefCards: 'animationdetail/crossrefCards',
      card: 'animationdetail/card',
      cardLoad: 'animationdetail/cardLoad'
    }),
    buttonText() {
      if(this.card.default == 0){
        return 'Save animation'
      }else {
        return 'Add animation'
      }
    }
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
    addOrSave() {
      if(this.card.default == 0){
        this.$store.dispatch('animationdetail/saveSet', this.card);
      }else{
        this.$store.dispatch('saveToSet', this.card.id);
      }
    }
    },
  mounted() {
    this.$store.dispatch('animationdetail/getAnimation', this.$route.params.detail)
    this.$store.dispatch('animationdetail/getCrossrefSets', this.$route.params.detail)
  }
};
</script>
<style lang="scss">
@import '../styles/views/general.scss';
@import '../styles/views/detail.scss';
</style>
