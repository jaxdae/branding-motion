<template>
  <div class="TopFilter__filter-wrapper">
    <div v-if="!isDetail" class="TopFilter__filters TopFilter__filters--home">
      <div class="TopFilter__filter-box">
        <h2 class="TopFilter__filter-headline">Quick search</h2>
        <span 
          class="TopFilter__clear"
          :class="{active : searchParam}"
          @click="clearSearch"
        ></span>
        <input
          class="TopFilter__input"
          v-model="searchParam"
          placeholder="Enter search term"
          @keyup.enter="search"
        />
      </div>
      <div class="TopFilter__filter-box">
        <h2 class="TopFilter__filter-headline caps">Elements</h2>
        <multiselect
          class="TopFilter__multiselect"
          :value="activeTagsElements"
          :options="optionsElements"
          @select="addElement"
          @remove="removeElement"
          :multiple="true"
          :close-on-select="false"
          :clear-on-select="true"
          :preselect-first="true"
          placeholder="Select elements"
        >
          <template slot="selection" slot-scope="{ values, search, isOpen }">
            <span
              v-if="values.length &amp;&amp; !isOpen"
              class="multiselect__single"
            >
              {{ values.length }} elements selected
            </span>
          </template>
        </multiselect>
      </div>
      <div class="TopFilter__filter-box">
        <h2 class="TopFilter__filter-headline caps">Categories</h2>
        <multiselect
          class="TopFilter__multiselect"
          :value="activeTagsCategories"
          :options="optionsCategories"
          @select="addCategory"
          @remove="removeCategory"
          :multiple="true"
          :close-on-select="false"
          :clear-on-select="true"
          :preselect-first="true"
          placeholder="Select categories"
        >
          <template slot="selection" slot-scope="{ values, search, isOpen }">
            <span
              v-if="values.length &amp;&amp; !isOpen"
              class="multiselect__single"
            >
              {{ values.length }} categories selected
            </span>
          </template>
        </multiselect>
      </div>
      <div
        class="TopFilter__search-button"
        @click="search"
      >
        <svg class="TopFilter__svg" width="100px" height="100px" viewBox="0 0 100 100" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
          <g id="fingerprint" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" stroke-linecap="round">
            <path class="TopFilter__path TopFilter__path--1" d="M42.6856004,50 C40.2341375,39.5731997 40.2341375,31.7757423 42.6856004,26.6076277 C46.3627947,18.8554558 55.6505347,15.2590558 65.3721196,15.9565328 C75.0937044,16.6540099 81.8891361,24.7629589 83.4464007,35.587269" id="Path-2" stroke="#000000" stroke-width="2"></path>
            <path class="TopFilter__path TopFilter__path--2" d="M48.2798034,57.9098143 C48.8281054,57.1234813 49.4015043,55.7752624 50,53.8651574 C50.8977435,51 45.8962646,38.1136522 48.2798034,33 C50.6633421,27.8863478 58.7679512,22.807161 65.8839756,25.67407 C73,28.5409789 79,39.0430431 78.2895051,52.3724138" id="Path-3" stroke="#000000" stroke-width="2"></path>
            <path class="TopFilter__path TopFilter__path--3" d="M56.2202242,60 C56.536889,59.5888939 56.9218953,57.7349264 57.375243,54.4380976 C58.0552645,49.4928545 52.1017643,34.8153857 60.1571492,32.9357438 C68.2125342,31.0561019 73,43.2644754 72.2487078,57.2473388" id="Path-4" stroke="#000000" stroke-width="2"></path>
            <path class="TopFilter__path TopFilter__path--4" d="M62.3677103,41.3769873 C63.6322897,44.9819337 63.6322897,54.7863899 63,58.7804967" id="Path-5" stroke="#000000" stroke-width="2"></path>
          </g>
        </svg>
      </div>
    </div>

    <!-- detail component -->

    <div v-else class="TopFilter__filters TopFilter__filters--detail">
      <nuxt-link to="/"><div class="TopFilter__back-button"></div></nuxt-link>
      <div class="TopFilter__filter-box">
        <h2 class="TopFilter__filter-headline caps">Programming language</h2>
        <multiselect
          disabled
          class="TopFilter__multiselect"
          :value="activeTagsElements"
          :options="optionsElements"
          @select="addElement"
          @remove="removeElement"
          :multiple="true"
          :close-on-select="false"
          :clear-on-select="true"
          :preselect-first="true"
          placeholder="Select elements"
        >
          <template slot="selection" slot-scope="{ values, search, isOpen }">
            <span
              v-if="values.length &amp;&amp; !isOpen"
              class="multiselect__single"
            >
              {{ values.length }} elements selected
            </span>
          </template>
        </multiselect>
      </div>
      <div class="TopFilter__filter-box">
        <h2 class="TopFilter__filter-headline">Primary color</h2>
        <input
          class="TopFilter__input TopFilter__multiselect"
          v-model="primaryColor"
          @keyup.enter="setPrimaryColor"
          @keydown="keepHashPrimary"
          maxlength="7"
          placeholder="Enter hex code"
        />
      </div>
      <div class="TopFilter__filter-box">
        <h2 class="TopFilter__filter-headline">Secondary color</h2>
        <input
          class="TopFilter__input TopFilter__multiselect"
          v-model="secondaryColor"
          @keyup.enter="setSecondaryColor"
          @keydown="keepHashSecondary"
          maxlength="7"
          placeholder="Enter hex code"
        />
      </div>
    </div>
  </div>
</template>

<script>
import Multiselect from 'vue-multiselect';
import { mapState, mapGetters } from 'vuex';
export default {
  name: 'TopFilter',
  components: { Multiselect },
  props: {
    isDetail: {
      type: Boolean,
      default: false,
    }
  },
  data() {
    return {
      categories: null,
      elements: null,
      optionsElements: [],
      optionsCategories: [],
      searchParam: '',
      primaryColor: '#',
      secondaryColor: '#'
    };
  },
  computed: {
    ...mapState([
      'activeTagsCategories',
      'activeTagsElements',
    ]),
    ...mapGetters([
      'searchTerm'
    ]),
  },
  watch: {
    searchTerm(newval, oldval) {
      this.searchParam = this.searchTerm;
    }
  },
  methods: {
    addElement(value) {
      let tags = [];
      tags.push(value)
      this.$store.commit('addTagElements', tags);
      this.$store.commit('enableFilter');
      this.$store.commit('activateElement');
    },
    addCategory(value) {
      let tags = [];
      tags.push(value)
      this.$store.commit('addTagCategories', tags);
      this.$store.commit('enableFilter');
      this.$store.commit('activateCategory');
    },
     removeElement(event) {
      this.$store.commit('removeTagElementsByName', event);
      this.$store.commit('disableFilter');
      this.$store.commit('deactivateElement');
    },
    removeCategory(event) {
      this.$store.commit('removeTagCategoriesByName', event);
      this.$store.commit('disableFilter');
      this.$store.commit('deactivateCategory');
    },
    search(value){
        this.$store.commit('setSearchTerm', this.searchParam);
        this.$store.commit('enableFilter');
        if(this.searchParam == ''){
          this.$store.commit('deactivateSearch');
        }else{
          this.$store.commit('activateSearch');
        }
    },
    clearSearch(){
      this.searchParam = '';
      this.search(this.searchParam);
    },
    setPrimaryColor(){
      if(/^#[0-9A-F]{6}$/i.test(this.primaryColor)){
        this.$store.commit('setPrimaryColor', this.primaryColor);
      }
    },
    setSecondaryColor() {
      this.$store.commit('setSecondaryColor', this.secondaryColor);
    },
    keepHashPrimary(e){
      if(e.key == 'Backspace' && this.primaryColor.length == 1 || e.key == 'Delete' && this.primaryColor.length == 1){
          e.preventDefault();
      }
    },
    keepHashSecondary(e){
      if(e.key == 'Backspace' && this.secondaryColor.length == 1 || e.key == 'Delete' && this.secondaryColor.length == 1){
          e.preventDefault();
      }
    }
  },
  mounted() {
      this.searchParam = this.searchTerm;
       this.$axios.get('/api/tags/elements')
       .then(response => {
        this.optionsElements = response.data.map(tag => {
          return tag.name
        })
      }).catch((error) => {
        console.log(error)
      })

      this.$axios.get('/api/tags/categories')
       .then(response => {
        this.optionsCategories = response.data.map(tag => {
          return tag.name
        })
      }).catch((error) => {
        console.log(error)
      })
  }
};
</script>

<style lang="scss">
@import './TopFilter.scss';
</style>