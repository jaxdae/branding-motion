export const state = () => ({
  currentBrandSet: {
    rational: null,
    innovative: null,
    maskuline: null,
    personal: null,
    serious: null,
    luxurious: null,
    delicate: null,
    simple: null,
  },
  savedAnimations: {},
  activeTagsElements: [],
  activeTagsCategories: [],
  anyFilterSelected: false,
  initialCards: {},
  initialLoad: false,
  allCards: {},
  allLoad: false,
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
}
export const mutations = {
  changeValues(state, identity) {
    state.currentBrandSet[identity.name] = identity.value;
    console.log(state.currentBrandSet);
  },
  removeValue(state, identity) {
    state.currentBrandSet[identity] = null;
    console.log(state.currentBrandSet);
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
      console.log(state.activeTagsCategories, singleTag)
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
    if (state.activeTagsCategories.length < 1 && state.activeTagsElements.length < 1) {
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
  setAllLoad: (state, bool) => {
    state.allLoad = bool;
    console.log(state.allLoad)
  } 
}

export const actions = {
  async getInitialCards({commit}) {
    let { data } = await this.$axios.get('/api/animations/initial')
    for(let i = 0; i<data.length; i++){
      data.valueSet = {
        rational: data[i].rational,
        innovative: data[i].innovative,
        personal: data[i].personal,
        maskuline: data[i].maskuline,
        serious: data[i].serious,
        luxurious: data[i].luxurious,
        delicate: data[i].delicate,
        simple: data[i].simple,
      } 
      let test = await this.$axios.get('/api/animationtags/' + data[i].id)
      data[i].tags = test.data.map(tag => {
        return tag.name;
      });
    }
 
    commit('setInitialCards', data);
    commit('setInitialLoad', true);
  },
  async getAllCards({ commit }) {
    let { data } = await this.$axios.get('/api/animations/all')
    for (let i = 0; i < data.length; i++) {
      data.valueSet = {
        rational: data[i].rational,
        innovative: data[i].innovative,
        personal: data[i].personal,
        maskuline: data[i].maskuline,
        serious: data[i].serious,
        luxurious: data[i].luxurious,
        delicate: data[i].delicate,
        simple: data[i].simple,
      }
      let test = await this.$axios.get('/api/animationtags/' + data[i].id)
      data[i].tags = test.data.map(tag => {
        return tag.name;
      });
    }

    commit('setAllCards', data);
    commit('setAllLoad', true);
  },
}