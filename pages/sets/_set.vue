<template>
  <div class="Set">
    <HeroSmall v-if="setDetail[0]"
      :id="setDetail[0].id"
      :name="setDetail[0].name"
      :description="setDetail[0].description"
      :tags="setDetail[0].tags"
      >
    </HeroSmall>
    <div class="Sets__wrapper">
      <div class="Sets__right">
          <Button label="Export this set" class="Sets__export"></Button>
          <Filters v-if="averageIdentity" :filteroptions="filteroptions" isLocked :valueset="averageIdentity" class="Sets__filters"></Filters>
          <Button label="Remove whole set" class="Sets__remove" :link="'/sets/'" @click.native="removeSet"></Button>
        </div>
      <div class="Sets__left">
        <div class="Sets__feed">
          <div class="Sets__feed--inner">
          <div class="Sets__results">
          {{ `You have ${number} animations saved on this list` }}
        </div>
        <div  v-if="setDetailReady && setDetail[0].animations">
          <Card
              v-for="card in setDetail[0].animations"
              :key="card.id"
              :id="card.id"
              :name="card.name"
              :tags="card.tags"
              :settagsId="card.tagIds"
              :description="card.description"
              :video="card.video"
              :valueset="card.valueSet"
              inSet
              class="Feed__card"
            >
            </Card>
            </div>
          </div>
        </div>
        </div>
      </div>
    <Footer></Footer>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex';
import Button from '../../components/Button/Button'
import Card from '../../components/AnimationCard/AnimationCard';
import HeroSmall from '@/components/HeroSmall/HeroSmall';
import Filters from '../../components/Filters/Filters'
import Footer from '@/components/Footer/Footer';

export default {
  name: 'Set',
  components: {
    Button,
    Card,
    HeroSmall,
    Filters,
    Footer
  },
  data() {
    return {
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
      },
      id: null,
    };
  },
   computed: {
    ...mapState([
      'customSets'
    ]),
    ...mapGetters({
      setDetail: 'setdetail/setDetail',
      setDetailReady: 'setdetail/setDetailReady'
    }),
    number(){
      if(this.setDetailReady){
      return this.setDetail[0].animations.length;
      }
    },
    averageIdentity() {
      if(this.setDetailReady){
      if(this.setDetail[0].animations.length>0){
      let valueSets = this.setDetail[0].animations.map(animation => {
        return animation.valueSet;
      });
     let result = valueSets.reduce(
      (a, c) => (Object.keys(c).forEach(k => (a[k] = (a[k] || 0) + c[k]/valueSets.length).toFixed(0)), a), {}
      );
     Object.entries(result).forEach(([key, value]) => {
      result[key] = +value.toFixed(0)
    })
      return result
    }
      }
     }
  },
  methods: {
    removeSet() {
      this.$store.dispatch('setdetail/removeSet', this.id);
    }
  },
  mounted() {
    this.id = this.$route.params.set;
    this.$store.dispatch('setdetail/getSetDetail', this.id);
  }
};
</script>
<style lang="scss">
@import '../../styles/views/sets.scss';
@import '../../styles/views/general.scss';
</style>