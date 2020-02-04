<template>
  <div class="Sets">
    <HeroSmall
      :name="'Animation Sets'"
      :description="'Go through all of your saved sets and animations, edit them and export the complete set once your set is completed.'">
    </HeroSmall>
    <div class="Sets__feed">
      <div class="Sets__info">
        <div class="Sets__results">
          {{ `You have ${number} personal animation sets` }}
        </div>
          <Button 
            class="Sets__button"
            :label="'Add new animation set'"
          >
          </Button>
        </div>
      <SetCard
        v-for="card in customSets"
        :key="card.id"
        :id="card.id"
        :name="card.name"
        :description="card.description"
        :videos="customVideos"
      ></SetCard>
    </div>
    <cross-ref-slider
      :subheadline="'See curated sets'"
      :headline="'Feeling uninspired?'"
      :cards="curatedCards"
    >
    </cross-ref-slider>
    <Footer></Footer>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex';
import HeroSmall from '@/components/HeroSmall/HeroSmall.vue';
import Button from '@/components/Button/Button.vue';
import Feed from '@/components/Feed/Feed.vue';
import Footer from '@/components/Footer/Footer.vue';
import SetCard from '@/components/SetCard/SetCard.vue';
import CrossRefSlider from '@/components/CrossRefSlider/CrossRefSlider.vue';

export default {
  name: 'Sets',
  components: {
    Button,
    CrossRefSlider,
    HeroSmall,
    Feed,
    Footer,
    SetCard
  },
  data() {
    return {
      sets: [],
      customSets: {},
      videos: [],
      customVideos: [],
      tags: [],
    };
  },
  computed: {
    number() {
      return this.customSets.length;
    },
    ...mapState([
      'curatedLoad'
    ]),
    ...mapGetters([
      'curatedCards',
    ]),
  },
  methods: {
     getCustomSets() {
      this.$axios.get('/api/sets/custom')
       .then(response => {
          this.customSets = response.data;
          this.customSets.forEach(set => {
            this.getVideos(set.id, 'customVideos');
            this.getTags(set.id);
          })
      }).catch((error) => {
        console.log(error)
      })
    },
     async getSets() {
       this.sets = await this.$axios.get('/api/sets/');
       
      this.$axios.get('/api/sets/')
       .then(response => {
          this.sets = response.data;
          this.sets.forEach((set, index) => {
            this.getVideos(set.id, index, 'videos');
          }).then(() => {
            this.loaded = true;
          })
      }).catch((error) => {
        console.log(error)
      })
    },
    getVideos(id, index, slot){
      this.$axios.get('/api/sets/animations/' + id)
       .then(response => {
         if(slot == "videos"){
          this.video = response.data[0].video;
          this.sets[index].video = this.video
        }else {
          this.customVideos = response.data.map(video => {
            return video.video;
          })
        }
      }).catch((error) => {
        console.log(error)
      })
    },
    getTags(id){
      this.$axios.get('/api/sets/tags/' + id)
       .then(response => {
        this.tags = response.data.map(tag => {
          return tag.name;
        })
      }).catch((error) => {
        console.log(error)
      })
    }
  },
  mounted(){
    this.$store.dispatch('getCuratedSets');
    this.getCustomSets();
  }
};
</script>
<style lang="scss">
@import '../../styles/views/sets.scss';
@import '../../styles/views/general.scss';
</style>