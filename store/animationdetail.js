import { components, effects } from '@/assets/effects.js';

export const state = () => ({
  crossrefCards: [],
  card: {},
  cardload: false,
  currentVariables: {
    slow: 0,
    rough: 0,
    hard: 0,
    sharp: 0,
    rectilineal: 0,
    static: 0
  }
})

export const getters = {
  crossrefCards: state => {
    return state.crossrefCards;
  },
  card: state => {
    return state.card;
  },
  cardLoad: state => {
    return state.cardload;
  },
  currentVariables: state => {
    return state.currentVariables;
  }
}

export const mutations = {
  setCrossrefCards: (state, cards) => {
    state.crossrefCards = cards;
  }, 
  setAnimation: (state, card) => {
    state.card = card;
  },
  setCardload: (state, bool) => {
    state.cardload = bool;
  },
  getCode(state) {
    Object.values(effects).forEach(effect => {
      if (effect.name == state.card.componentName) {
        state.card.effect = effect;
      };
    })
  },
  setCurrentVariables(state, identity){
    state.currentVariables[identity.name] = identity.value;
  },
  setConvertedVariables(state, identity) {
    state.convertedVariables[identity.name] = identity.value;
  }
}

export const actions = {
  async getAnimation({ commit }, id) {
    let { data } = await this.$axios.get('/api/animations/' + id);
      let tags = await this.$axios.get('/api/animationtags/' + data.id);
      data.tags = tags.data.map(tag => {
        return tag.name;
      });
      data.valueSet = {
        rational: data.rational,
        innovative: data.innovative,
        personal: data.personal,
        maskuline: data.maskuline,
        serious: data.serious,
        luxurious: data.luxurious,
        delicate: data.delicate,
        simple: data.simple,
      };
      data.variables = {
        slow: data.slow,
        rough: data.rough,
        hard: data.hard,
        sharp: data.sharp,
        rectilineal: data.rectilineal,
        static: data.static
      }
    commit('setAnimation', data);
    commit('getCode');
    commit('setCardload', true);
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
  async updateAnimation({ commit, state }, id) {
    let updatedAnimation = await this.$axios.put('/api/animations/update/' + id, {
      slow: state.currentVariables.slow,
      rough: state.currentVariables.rough,
      hard: state.currentVariables.hard,
      sharp: state.currentVariables.sharp,
      rectilineal: state.currentVariables.rectilineal,
      static: state.currentVariables.static
    });
  }
}