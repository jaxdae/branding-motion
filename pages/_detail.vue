<template>
  <div class="Detail">
    <popup-code
      v-if="popupCodeOpen"
      @popupOpen="switchView"
      :html="card.effect.html"
      :css="card.effect.css">
    </popup-code>
    <hero-small :animation="card" :tags="card.tags"></hero-small>
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
          :vars="currentVariables"
        />
        <div @click="switchView" class="Detail__switcher"></div>
        <Button
          class="Detail__add"
          :link="buttonLink"
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
          :filteroptions="filteroptions"
          :name="'Adjustments'"
          class="Detail__adjustments"
          isVariables
          :variables="card.variables"
        >
        </filters>
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

export default {
  name: 'Detail',
  components: {
    ...components
  },
  data() {
    return {
      name: '',
      isCollapsed: true,
      popupCodeOpen: false,
      filteroptions: {
        slow: {
          left: 'slow',
          right: 'fast',
          tooltipleft: 'inexpensive, traditional',
          tooltipright: 'innovative, luxurious'
        },
        rough: {
          left: 'rough',
          right: 'smooth',
          tooltipleft: 'rational, serious, maskuline',
          tooltipright: 'emotional, straightforward, feminine'
        },
        hard: {
          left: 'hard edge',
          right: 'soft edge',
          tooltipleft: 'rational, maskuline, simple',
          tooltipright: 'emotional, feminine, complex'
        },
        sharp: {
          left: 'sharp',
          right: 'blurry',
          tooltipleft: 'sturdy, simple, feminine',
          tooltipright: 'complex, delicate, maskuline'
        },
        rectilineal: {
          left: 'rectilineal',
          right: 'arched',
          tooltipleft: 'rational, serious, institutional',
          tooltipright: 'emotional, straightforward, personal'
        },
        static: {
          left: 'static',
          right: 'flexible',
          tooltipleft: 'luxurious, traditional, personal',
          tooltipright: 'inexpensive, innovative, institutional'
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
      cardLoad: 'animationdetail/cardLoad',
      currentVariables: 'animationdetail/currentVariables',
      convertedVariables: 'animationdetail/convertedVariables'
    }),
    buttonText() {
      if(this.card.default == 0){
        return 'Save animation'
      }else {
        return 'Add animation'
      }
    },
    buttonLink() {
      if(this.card.default == 0){
        return this.$route.params.detail;
      }else {
        return '/sets/95';
      }
    }
  },
  methods: {
    collapse(isCollapsed) {
      this.isCollapsed = isCollapsed;
    },
    switchView() {
      if (this.popupCodeOpen) {
        this.popupCodeOpen = false;
      } else {
        this.popupCodeOpen = true;
      }
    },
    addOrSave() {
      if(this.card.default == 0){
        this.$store.dispatch('animationdetail/updateAnimation', this.card.id);
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
