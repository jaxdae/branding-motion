import { components, effects } from '@/assets/effects.js';

export const state = () => ({
  crossrefCards: [],
  card: {},
  cardload: false,
  currentVariables: {
    slow: 0,
    rough: 0,
    hard: 0,
    rectilineal: 0,
    static: 0
  },
  convertedVariables: {
    slow: 0,
    rough: 0,
    hard01: 0,
    hard02: 0,
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
  },
  convertedVariables: state => {
    return state.convertedVariables;
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
    switch (identity.name){
      case 'slow':
        state.convertedVariables[identity.name] = Math.round((1 - (identity.value - 1) * 0.2) * 10) / 10;
      break;
    case 'static': {
        if(identity.value == 1){
          state.convertedVariables[identity.name] = 'linear'
        }
        if (identity.value == 2) {
          state.convertedVariables[identity.name] = 'ease-in'
        }
        if (identity.value == 3) {
          state.convertedVariables[identity.name] = 'ease-in-out'
        }
        if (identity.value == 4) {
          state.convertedVariables[identity.name] = 'cubic-bezier(0.65,0,.076,1)'
        }
        if (identity.value == 5) {
          state.convertedVariables[identity.name] = 'cubic-bezier(0.68, -0.55, 0.265, 1.55)'
        }
      }
    break;
      case 'rectilineal': {
        if (identity.value == 1) {
          state.convertedVariables.rectilineal = '0';
        }
        if (identity.value == 2) {
          state.convertedVariables.rectilineal = '5px';
        }
        if (identity.value == 3) {
          state.convertedVariables.rectilineal = '10px';
        }
        if (identity.value == 4) {
          state.convertedVariables.rectilineal = '15px';
        }
        if (identity.value == 5) {
          state.convertedVariables.rectilineal = '30px';
        }
      }
      break;
      case 'hard': {
        if (identity.value == 1) {
          state.convertedVariables.hard01 = '0 0 0 0';
        }
        if (identity.value == 2) {
          state.convertedVariables.hard01 = '0 0 5px 0';
        }
        if (identity.value == 3) {
          state.convertedVariables.hard01 = '0 0 10px 5px';
        }
        if (identity.value == 4) {
          state.convertedVariables.hard01 = '0 0 10px 10px';
        }
        if (identity.value == 5) {
          state.convertedVariables.hard01 = '0 0 20px 15px';
        }
      }
    break;
    }
  }
}

export const actions = {
  async getAnimation({ commit }, id) {
    let { data } = await this.$axios.get('/api/animations/' + id);
      let tags = await this.$axios.get('/api/animationtags/' + data.id);
      data.tags = tags.data.map(tag => {
        return tag.name;
      });
      data.valueset = {
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
      rectilineal: state.currentVariables.rectilineal,
      static: state.currentVariables.static
    });
  }
}