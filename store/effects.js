export const state = () => ({
  convertedVars: {},
})

export const getters = {
  convertedVars: state => {
    return state.convertedVars;
  }

}

export const mutations = {
  convertVariables(state, identity) {
    state.convertedVars[identity.name] = identity.value * 0.2;
  }
}



