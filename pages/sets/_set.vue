<template>
  <div class="Set">
    <hero-small v-if="setDetail"
      editable
      :id="setDetail.id"
      :name="setDetail.name"
      :description="setDetail.description"
      :tags="setDetail.tags"
      :setId="$route.params.set"
      >
    </hero-small>
    <div class="Sets__back-wrapper">
      <nuxt-link class="Sets__back" to="/sets"></nuxt-link>
    </div>
    <div class="Sets__content">
      <div class="Home__left">
        <div class="Sets__feed">
          <div class="Sets__feed--inner">
          <div class="Sets__results">
          {{ `You have ${number} animations saved on this list` }}
        </div>
        <mq-layout :mq="['xs', 'sm', 'md', 'lg', 'xl']">
        <Button
          v-if="setDetailReady && setDetail.animations"
          :label="displayLabel"
          class="Sets__remove--mobile"
          :link="'/sets/'"
          :class="{noset : setDetail.animations.length < 1}"
          @click.native="removeSet">
        </Button>
        </mq-layout>
        <div  v-if="setDetailReady && setDetail.animations.length >= 1">
          <transition-group name="fade">
            <Card
                v-for="card in setDetail.animations"
                :key="card.id"
                :id="card.id"
                :name="card.name"
                :tags="card.tags"
                :settagsId="card.tagIds"
                :description="card.description"
                :video="card.video"
                :valueset="card.valueset"
                inSet
                class="Feed__card"
              >
              </Card>
            </transition-group>
            </div>
            <empty-placeholder
              v-else
              type="Animation"
              subheadline="No animations found"
              headline="Oops! Looks like you haven't saved any animations yet!"
              body="Get started by exploring all animations or go back to the set overview"
            ></empty-placeholder>
            <preloader class="Sets__preloader" v-if="!setDetailReady"></preloader>
          </div>
        </div>
      </div>
      <div class="Sets__right">
        <Button
          v-if="setDetailReady && setDetail.animations.length >= 1"
            label="Export this set"
            :link="'/sets/'+$route.params.set"
            class="Home__cart"
            @click.native="exportSet"
        >
        </Button>
        <Filters v-if="averageIdentity" :filteroptions="filteroptions" isLocked :valueset="averageIdentity" isvalueset class="Home__filters"></Filters>
        <Button
          v-if="setDetailReady && setDetail.animations"
          :label="displayLabel"
          class="Sets__remove"
          :link="'/sets/'"
          :class="{noset : setDetail.animations.length < 1}"
          @click.native="removeSet">
        </Button>
      </div>
    </div>
    <Footer></Footer>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex';

export default {
  name: 'Set',
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
    displayLabel() {
      if(this.setDetail.custom == 0){
        return 'Add to personal sets'
      }else {
        return 'remove whole set'
      }
    },
    number(){
      if(this.setDetailReady){
      return this.setDetail.animations.length;
      }
    },
    averageIdentity() {
      if(this.setDetailReady){
      if(this.setDetail.animations.length>0){
      let valuesets = this.setDetail.animations.map(animation => {
        return animation.valueset;
      });
     let result = valuesets.reduce(
      (a, c) => (Object.keys(c).forEach(k => (a[k] = (a[k] || 0) + c[k]/valuesets.length).toFixed(0)), a), {}
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
      if(this.setDetail.custom == 1){
      this.$store.dispatch('setdetail/removeSet', this.id);
      }else {
         let req = {
            id: this.setDetail.id, 
            name: this.setDetail.name,
            desc: this.setDetail.description,
            tagIds: this.setDetail.tagIds,
            tags: this.setDetail.tags
            };
        this.$store.dispatch('setoverview/saveAsSet', req);
      }
    },
    exportSet(e){
      this.downloadObjectAsJson(this.setDetail, 'SetExport');
    },
    downloadObjectAsJson(exportObj, exportName){
      let dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(exportObj));
      let downloadAnchorNode = document.createElement('a');
      downloadAnchorNode.setAttribute("href",     dataStr);
      downloadAnchorNode.setAttribute("download", exportName + ".json");
      document.body.appendChild(downloadAnchorNode); // required for firefox
      downloadAnchorNode.click();
      downloadAnchorNode.remove();
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
@import '../../styles/animations.scss';
</style>