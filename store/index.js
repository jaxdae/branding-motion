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
})

export const getters = {
  activeTagsElements: state => {
    return state.activeTagsElements;
  },
   activeTagsCategories: state => {
     return state.activeTagsCategories;
  }
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
    console.log('cate')
    state.activeTagsCategories.splice(state.activeTagsCategories.indexOf(tag), 1);
  },

  enableFilter(state){
    state.anyFilterSelected = true;
  },
  disableFilter(state){
    if(!state.activeTagsElements && !state.activeTagsCategories){
      state.anyFilterSelected = false;
    }
  }
}