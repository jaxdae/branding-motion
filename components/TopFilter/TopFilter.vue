<template>
  <div class="TopFilter__filter-wrapper">
    <div class="TopFilter__filters">
      <div class="TopFilter__filter-box">
        <h2 class="TopFilter__filter-headline">Quick search</h2>
        <input class="TopFilter__input" placeholder="Enter search term" />
      </div>
      <div class="TopFilter__filter-box">
        <h2 class="TopFilter__filter-headline caps">Elements</h2>
        <multiselect
          v-model="elements"
          :options="optionsElements"
          @input="input"
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
          v-model="categories"
          :options="optionsCategories"
          @input="input"
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
      <div class="TopFilter__search-button"></div>
    </div>
  </div>
</template>

<script>
import Multiselect from 'vue-multiselect';
import '../../assets/fonts/iconfont.scss';
export default {
  name: 'TopFilter',
  components: { Multiselect },
  data() {
    return {
      categories: null,
      elements: null,
      optionsElements: [],
      optionsCategories: []
    };
  },
  methods: {
    input() {
      this.$emit('tags', this.categories, this.elements);
    }
  },
  mounted() {
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
