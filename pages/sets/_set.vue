<template>
  <div class="Set">
    <HeroSmall
      :id="currentSet.id"
      :name="currentSet.name"
      :description="currentSet.description"
      :tags="currentSet.tags"
      >
    </HeroSmall>
    <div class="Sets__wrapper">
      <div class="Sets__right">
          <Button label="Export this set" class="Sets__export"></Button>
          <Filters v-if="averageIdentity" :filteroptions="filteroptions" isLocked :valueset="averageIdentity" class="Sets__filters"></Filters>
        </div>
      <div class="Sets__left">
        <div class="Sets__feed">
          <div class="Sets__feed--inner">
          <div class="Sets__results">
          {{ `You have ${number} personal animation sets` }}
        </div>
          <Card
              v-for="card in currentAnimations"
              :key="card.id"
              :id="card.id"
              :name="card.name"
              :tags="card.tags"
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
      }
    };
  },
   computed: {
    ...mapState([
      'customSets'
    ]),
    ...mapGetters([
      'sets',
      'allCards'
    ]),
    number(){
      return this.currentAnimations.length;
    },
    currentSet(){
      return this.sets.filter(set => set.id == parseInt(this.$route.params.set))[0]
    },
    currentAnimations(){
     let filters = this.currentSet.animations;
     return this.allCards.filter(item => {
       return filters.indexOf(item.id) !== -1
     })
    },
    averageIdentity() {
      let valueSets = this.currentAnimations.map(animation => {
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
};
</script>
<style lang="scss">
@import '../../styles/views/sets.scss';
@import '../../styles/views/general.scss';
</style>