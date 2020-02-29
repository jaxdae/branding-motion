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
    <div class="Sets__content">
      <div class="Home__left">
        <div class="Sets__feed">
          <div class="Sets__feed--inner">
          <div class="Sets__results">
          {{ `You have ${number} animations saved on this list` }}
        </div>
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
                :valueset="card.valueSet"
                inSet
                class="Feed__card"
              >
              </Card>
            </transition-group>
            </div>
            <empty-placeholder v-else type="Animation"></empty-placeholder>
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
        <Filters v-if="averageIdentity" :filteroptions="filteroptions" isLocked :valueset="averageIdentity" isValueSet class="Home__filters"></Filters>
        <Button
          v-if="setDetailReady && setDetail.animations"
          label="Remove whole set"
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
    number(){
      if(this.setDetailReady){
      return this.setDetail.animations.length;
      }
    },
    averageIdentity() {
      if(this.setDetailReady){
      if(this.setDetail.animations.length>0){
      let valueSets = this.setDetail.animations.map(animation => {
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