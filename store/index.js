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
  activeTags: [],
  anyFilterSelected: false,
})

export const getters = {
  activeTags: state => {
    return state.activeTags;
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
  addTag(state, tag){
    tag.forEach(singleTag => {
      if(state.activeTags.includes(singleTag)){
        state.activeTags.push(singleTag);
      }
    })
    console.log(state.activeTags);
  },
  removeTag(state, tag) {
    state.activeTags.splice(tag,1);
    console.log(state.activeTags);
  }
}