export const state = () => ({
  currentBrandSet: {
    rational: 0,
    innovative: 0,
    maskuline: 0,
    personal: 0,
    serious: 0,
    luxurious: 0,
    delicate: 0,
    simple: 0,
  },
  savedAnimations: {},
  activeTagsElements: [],
  activeTagsCategories: [],
  anyFilterSelected: false,
  allCards: [],
  allLoad: false,
  searchTerm: '',
  activeElement: false,
  activeCategory: false,
  activeSearch:false,
})

export const getters = {
  activeTagsElements: state => {
    return state.activeTagsElements;
  },
   activeTagsCategories: state => {
     return state.activeTagsCategories;
  },
  allCards: state => {
    return state.allCards;
  },
  searchTerm: state => {
    return state.searchTerm;
  },
  currentBrandSet: state => {
    return state.currentBrandSet;
  },
  activeCategory: state => {
    return state.activeCategory;
  },
  activeElement: state => {
    return state.activeElement;
  },
  activeSearch: state => {
    return state.activeSearch;
  },
  
}
import Vue from 'vue';

export const mutations = {
  activateElement(state){
    state.activeElement = true;
  }, activateCategory(state) {
    state.activeCategory = true;
  }, activateSearch(state) {
    state.activeSearch = true;
  },
  deactivateElement(state) {
    if (state.activeTagsElements.length < 1) {
      state.activeElement = false;
    }
  }, 
  deactivateCategory(state) {
    if (state.activeTagsCategories.length < 1) {
      state.activeCategory = false;
    }
  }, 
  deactivateSearch(state) {
    state.activeSearch = false;
  },
  setSearchTerm(state, term) {
    state.searchTerm = term;
  },
  changeValues(state, identity) {
   state.currentBrandSet[identity.name] = identity.value;
  },
  removeValue(state, identity) {
    state.currentBrandSet[identity] = 0;
  },
  addTagElements(state, tag){
    tag.forEach(singleTag => {
      if(!state.activeTagsElements.includes(singleTag)){
        state.activeTagsElements.push(singleTag);
      }
    })
  },
  addTagCategories(state, tag) {
    tag.forEach(singleTag => {
      if (!state.activeTagsCategories.includes(singleTag)) {
        state.activeTagsCategories.push(singleTag);
      }
    })
  },
  removeTagElements(state, tag) {
    state.activeTagsElements.splice(tag,1);
  },
    removeTagCategories(state, tag) {
    state.activeTagsCategories.splice(tag, 1);
  },
    removeTagElementsByName(state, tag) {
    state.activeTagsElements.splice(state.activeTagsElements.indexOf(tag), 1);
  },
  removeTagCategoriesByName(state, tag) {
    state.activeTagsCategories.splice(state.activeTagsCategories.indexOf(tag), 1);
  },

  enableFilter(state){
    state.anyFilterSelected = true;
  },
  disableFilter(state) {
    if (state.activeTagsCategories.length < 1 && state.activeTagsElements.length < 1 && !state.activeSearch) {
      state.anyFilterSelected = false;
    }
  },
  setAllCards: (state, cards) => {
    state.allCards = cards;
  },
  setAllLoad: (state, bool) => {
    state.allLoad = bool;
  },
 
  calculateScore: (state) => {
    Object.values(state.allCards).forEach((card, i) => {
      let score = 0;
      Object.values(card.valueSet).forEach((value, index) => {
        if (state.currentBrandSet[Object.keys(state.currentBrandSet)[index]]){
          score += Math.abs(value - state.currentBrandSet[Object.keys(state.currentBrandSet)[index]])
        }
      })
      Vue.set(state.allCards[i], 'score', score);
    })
  }
}

export const actions = {
  async saveToSet({ commit }, id){
    let { data } = await this.$axios.post('/api/sets/animation/', {
      animationId: id,
      setId: 1
    })
  },
  async getAllCards({ commit }) {
    let { data } = await this.$axios.get('/api/animations/all');
    for (let i = 0; i < data.length; i++) {
      data[i].valueSet = {
        rational: data[i].rational,
        innovative: data[i].innovative,
        personal: data[i].personal,
        maskuline: data[i].maskuline,
        serious: data[i].serious,
        luxurious: data[i].luxurious,
        delicate: data[i].delicate,
        simple: data[i].simple,
      }
      let tags = await this.$axios.get('/api/animationtags/' + data[i].id);
      data[i].tags = tags.data.map(tag => {
        return tag.name;
      });
    }
    commit('setAllCards', data);
    commit('setAllLoad', true);
  },
  async removeFromSet({ commit }, id) {
    let animation = await this.$axios.delete('/api/animations/remove/' + id);
    let animationtags = await this.$axios.delete('/api/animations/tags/remove/' + id);
    let animationsets = await this.$axios.delete('/api/animationsets/remove/' + id);
  }
}


  