<template>
  <div class="MobileFilters__filter-wrapper">
    <div v-if="!isDetail" class="MobileFilters__filters MobileFilters__filters--home">
      <div class="MobileFilters__filter-box">
        <h2 class="MobileFilters__filter-headline">Quick search</h2>
        <span 
          class="MobileFilters__clear"
          :class="{active : searchParam}"
          @click="clearSearch"
        ></span>
        <input
          class="MobileFilters__input"
          v-model="searchParam"
          placeholder="Enter search term"
          @keyup.enter="search"
        />
        <div class="MobileFilters__filter-button"></div>
      </div>
      <div class="MobileFilters__filter-box">
        <h2 class="MobileFilters__filter-headline caps">Elements</h2>
        <multiselect
          class="MobileFilters__multiselect"
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
      <div class="MobileFilters__filter-box">
        <h2 class="MobileFilters__filter-headline caps">Categories</h2>
        <multiselect
          class="MobileFilters__multiselect"
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
        class="MobileFilters__search-button"
        @click="search"
      >
      </div>
    </div>

    <!-- detail component -->

    <div v-else class="MobileFilters__filters MobileFilters__filters--detail">
      <nuxt-link to="/"><div class="MobileFilters__back-button"></div></nuxt-link>
      <div class="MobileFilters__filter-box">
        <h2 class="MobileFilters__filter-headline caps">Programming language</h2>
        <multiselect
        disabled
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
      <div class="MobileFilters__filter-box">
        <h2 class="MobileFilters__filter-headline">Primary color</h2>
        <input
          class="MobileFilters__input"
          v-model="primaryColor"
          @keyup.enter="setPrimaryColor"
          @keydown="keepHashPrimary"
          maxlength="7"
          placeholder="Enter hex code"
        />
      </div>
      <div class="MobileFilters__filter-box">
        <h2 class="MobileFilters__filter-headline">Secondary color</h2>
        <input
          class="MobileFilters__input"
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
  name: 'MobileFilters',
  components: { Multiselect },
  data() {
    return {
      categories: null,
      elements: null,
      optionsElements: [],
      optionsCategories: [],
      searchParam: '',
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
@import './MobileFilters.scss';
</style>