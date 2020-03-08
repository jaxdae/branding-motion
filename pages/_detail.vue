<template>
  <div class="Detail">
    <transition name="opacity">
    <div class="Detail__darker" v-if="popupCodeOpen"></div>
    </transition>
    <transition name="scale-up">
    <popup-code
      v-if="popupCodeOpen"
      @popupOpen="switchView"
      :html="card.effect.html"
      :css="card.effect.css"
      :js="card.effect.js"
      :class="{overflow: showOverflow}"
      >
    </popup-code>
    </transition>
    <hero-small :animation="card" :tags="card.tags"></hero-small>
    <mq-layout :mq="['xxl', 'max']">
      <top-filter isDetail></top-filter>
      <div class="Detail__wrapper" v-if="cardLoad">
        <filters
          :filteroptions="brandtraits"
          :valueset="card.valueset"
          :key=1
          @isCollapsed="collapse"
          collapse
          isvalueset
          isLocked
          noLockIcon
          class="Detail__background"
        >
        </filters>
        <Effect
          :type="card.effect.type"
          :class="{ wider: !isCollapsed}"
          class="Detail__animation"
        >
        <div v-if="showListChooser" class="Detail__select-overlay">
          <div class="AnimationCard__close" @click="showListChooser=false"></div>
          <div class="Detail__available-sets">
            <div
              v-for="(sets, index) in availableSets"
              :key="sets.id"
              class="Detail__save-option"
              @click="saveToSet(index)"
            >
            {{sets.name}}
            </div>
          </div>
        </div>
          <component
            :is="card.effect.name"
            class="Detail__component"
            :vars="convertedVariables"
          />
          <div @click="switchView" class="Detail__switcher"></div>
          <Button
            class="Detail__add"
            :link="$route.params.detail"
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
    </mq-layout>
    <mq-layout :mq="['xs', 'sm', 'md', 'lg', 'xl']">
      <empty-placeholder
        class="Detail__empty"
        subheadline="Not available on mobile"
        headline="Oops! Looks like you're on a mobile device!"
        body="In order to make adjustments on the animations you need to be on a desktop sized screen!"
      >
      </empty-placeholder>
    </mq-layout>
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
      showListChooser: false,
      showOverflow: false,
      hideOverflow: false,
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
      convertedVariables: 'animationdetail/convertedVariables',
      availableSets: 'setoverview/availableSets'
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
      if (this.popupCodeOpen) {
        document.getElementsByTagName('body')[0].classList.remove('hidden');
        this.popupCodeOpen = false;
      } else {
        document.getElementsByTagName('body')[0].classList.add('hidden');
        this.popupCodeOpen = true;
      }
    },
    addOrSave() {
      if(this.card.default == 0){
        this.$store.dispatch('animationdetail/updateAnimation', this.card.id);
      }else{
        this.showListChooser = true;
      }
    },
    saveToSet(index) {
      let req = {
        animationId: this.card.id,
        setId: this.availableSets[index].id
      }
      this.$store.dispatch('saveToSet', req);
      this.showListChooser = false;
      this.$router.push({
        path: '/sets/' + req.setId
      })
    },
    },
  mounted() {
    this.$store.dispatch('animationdetail/getAnimation', this.$route.params.detail)
    this.$store.dispatch('animationdetail/getCrossrefSets', this.$route.params.detail)
    this.$store.dispatch('setoverview/getAllSets');
  }
};
</script>
<style lang="scss">
@import '../styles/views/general.scss';
@import '../styles/animations.scss';
@import '../styles/views/detail.scss';
</style>
