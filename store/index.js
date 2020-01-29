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
  savedAnimations: {}
})

export const mutations = {
  changeValues(state, identity) {
    state.currentBrandSet[identity.name] = identity.value;
    console.log(state.currentBrandSet);
  },
  removeValue(state, identity) {
    state.currentBrandSet[identity] = null;
    console.log(state.currentBrandSet);
  }
}