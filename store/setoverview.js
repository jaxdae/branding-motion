export const state = () => ({
  curatedLoad: false,
  sets: {},
  curatedCards: [],
})

export const getters = {
  sets: state => {
    return state.sets;
  },
  curatedCards: state => {
    return state.curatedCards;
  },
}

export const mutations = {
  setCuratedCards: (state, cards) => {
    state.curatedCards = cards;
  },
  setCuratedLoad: (state, bool) => {
    state.curatedLoad = bool;
  },
  setSets: (state, sets) => {
    state.sets = sets;
  },

}

export const actions = {
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
  }
}