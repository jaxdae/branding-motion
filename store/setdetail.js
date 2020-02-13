export const state = () => ({
  setDetail: {},
  setDetailReady: false,
 
})

export const getters = {
  setDetail: state => {
    return state.setDetail;
  },
  setDetailReady: state => {
    return state.setDetailReady;
  }
  
}

export const mutations = {
  setDetail: (state, data) => {
    state.setDetail = data;
  },
  setDetailReady: (state, bool) => {
    state.setDetailReady = bool;
  }
  
}

export const actions = {
  async getSetDetail({ commit }, id) {

    let { data } = await this.$axios.get('/api/sets/' + id);

    let tags = await this.$axios.get('/api/sets/tags/' + id);
    data[0].tags = tags.data.map(tag => {
      return tag.name;
    });
    
    let animations = await this.$axios.get('/api/sets/animation/' + id);

    for (let i = 0; i < animations.data.length; i++) {
      animations.data[i].valueSet = {
        rational: animations.data[i].rational,
        innovative: animations.data[i].innovative,
        personal: animations.data[i].personal,
        maskuline: animations.data[i].maskuline,
        serious: animations.data[i].serious,
        luxurious: animations.data[i].luxurious,
        delicate: animations.data[i].delicate,
        simple: animations.data[i].simple,
      }

      let anitags = await this.$axios.get('/api/animationtags/' + animations.data[i].id);
      animations.data[i].tags = anitags.data.map(tag => {
        return tag.name;
      });
    }

    data[0].animations = animations.data;
    commit('setDetailReady', true);
    commit('setDetail', data);
  },
}