<template>
  <div class="Detail">
    <HeroSmall :animation="cards.firstCard"></HeroSmall>
    <top-filter></top-filter>
    <div class="Detail__wrapper">
      <filters
        :filteroptions="brandtraits"
        @isCollapsed="collapse"
        collapse
        class="Detail__brandtraits"
      >
      </filters>
      <Effect
        :type="Object.values(effects)[0].type"
        :class="{ wider: !isCollapsed }"
        class="Detail__animation"
      >
        <!-- eslint-disable-next-line vue/require-component-is -->
        <component
          :is="Object.values(effects)[0].name"
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
          :html="Object.values(effects)[0].html"
          :css="Object.values(effects)[0].css"
        >
        </Code>
      </div>
    </div>
    <cross-ref-slider :cards="cards"></cross-ref-slider>
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
      effects,
      cards: {
        firstCard: {
          id: 1,
          name: 'Button background expand hover effect',
          description:
            'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy dolor sit amet dolor.',
          tags: ['Button', 'Hover'],
          video: require('../assets/videos/animation.mp4')
        },
        secondCard: {
          id: 2,
          name: 'Button background expand hover effect',
          description:
            'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy dolor sit amet dolor.',
          tags: ['Button', 'Hover'],
          video: require('../assets/videos/animation.mp4')
        },
        thirdCard: {
          id: 3,
          name: 'Button background expand hover effect',
          description:
            'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy dolor sit amet dolor.',
          tags: ['Button', 'Hover'],
          video: require('../assets/videos/animation.mp4')
        },
        fourthCard: {
          id: 4,
          name: 'Button background expand hover effect',
          description:
            'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy dolor sit amet dolor.',
          tags: ['Button', 'Hover'],
          video: require('../assets/videos/animation.mp4')
        },
        fifthCard: {
          id: 5,
          name: 'Button background expand hover effect',
          description:
            'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy dolor sit amet dolor.',
          tags: ['Button', 'Hover'],
          video: require('../assets/videos/animation.mp4')
        }
      },
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
    }
  }
};
</script>
<style lang="scss">
@import '../styles/views/general.scss';
@import '../styles/views/detail.scss';
</style>
