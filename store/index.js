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
  initialCards: {},
  initialLoad: false,
  allCards: {},
  curatedCards: [],
  crossrefCards: [],
  allLoad: false,
  curatedLoad: false,
  searchTerm: '',
  activeElement: false,
  activeCategory: false,
  activeSearch:false,
  sets: {},
})

export const getters = {
  activeTagsElements: state => {
    return state.activeTagsElements;
  },
   activeTagsCategories: state => {
     return state.activeTagsCategories;
  },
  initialCards: state => {
    return state.initialCards;
  },
  allCards: state => {
    return state.allCards;
  },
  curatedCards: state => {
    return state.curatedCards;
  },
  crossrefCards: state => {
    return state.crossrefCards;
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
  sets: state => {
    return state.sets;
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
  setInitialCards: (state, cards) => {
    state.initialCards = cards;
  },
  setInitialLoad: (state, bool) => {
    state.initialLoad = bool;
  } ,
  setAllCards: (state, cards) => {
    state.allCards = cards;
  },
  setCuratedCards: (state, cards) => {
    state.curatedCards = cards;
  },
  setSets: (state, sets) => {
    state.sets = sets;
  },
  setCrossrefCards: (state, cards) => {
    state.crossrefCards = cards;
  },
  setAllLoad: (state, bool) => {
    state.allLoad = bool;
  },
  setCuratedLoad: (state, bool) => {
    state.curatedLoad = bool;
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
  async getInitialCards({commit}) {
    let { data } = await this.$axios.get('/api/animations/initial')
    for(let i = 0; i<data.length; i++){
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
 
    commit('setInitialCards', data);
    commit('setInitialLoad', true);
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
  async getCuratedSets({ commit }) {
    let { data } = await this.$axios.get('/api/sets/');
    for (let i = 0; i < data.length; i++) {
      let tags = await this.$axios.get('/api/sets/tags/' + data[i].id);
      data[i].tags = tags.data.map(tag => {
        return tag.name;
      });
    }
    for (let i = 0; i < data.length; i++) {
      let videos = await this.$axios.get('/api/sets/animations/' + data[i].id);
      data[i].videos = videos.data.map(video => {
        return video.video;
      });
      data[i].animations = videos.data.map(animation => {
        return animation.animationId;
      });
    }
    commit('setCuratedCards', data);
    commit('setCuratedLoad', true);
  },
  async getCrossrefSets({ commit }, id) {
    let { data } = await this.$axios.get('/api/crossrefs/' + id);
    for (let i = 0; i < data.length; i++) {
      let tags = await this.$axios.get('/api/animationtags/' + data[i].id);
      data[i].tags = tags.data.map(tag => {
        return tag.name;
      });
    }
    commit('setCrossrefCards', data);
  },
  async getSets({ commit }, id) {
    let { data } = await this.$axios.get('/api/sets/custom');
    for (let i = 0; i < data.length; i++) {
      let tags = await this.$axios.get('/api/sets/tags/' + data[i].id);
      data[i].tags = tags.data.map(tag => {
        return tag.name;
      });
    }
    for (let i = 0; i < data.length; i++) {
      let videos = await this.$axios.get('/api/sets/animations/' + data[i].id);
      data[i].videos = videos.data.map(video => {
      return video.video;
      });
      data[i].animations = videos.data.map(animation => {
        return animation.animationId;
      });
    }
    commit('setSets', data);
  },
}