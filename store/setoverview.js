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
  addToSets: (state, sets) => {
    state.sets.push(sets)
    console.log(sets, state.sets)
  }
}

export const actions = {
  async saveAsSet({ commit }, req) {
    let sets = await this.$axios.post('/api/sets/add/', {
      name: req.name,
      description: req.desc,
      custom: 1
    })

    

    let animations = await this.$axios.get('/api/sets/animation/' + req.id);
      animations.data.forEach( async (animation, index) => {
      
      let customanimations = await this.$axios.post('/api/animations/add/', {
        name: animation.name,
        description: animation.description,
        video: animation.video,
        componentName: animation.componentName,
        rational: animation.rational,
        innovative: animation.innovative,
        personal: animation.personal,
        maskuline: animation.maskuline,
        serious: animation.serious,
        luxurious: animation.luxurious,
        delicate: animation.delicate,
        simple: animation.simple,
        default: 1,
        slow: animation.slow,
        rough: animation.rough,
        hard: animation.hard,
        sharp: animation.sharp,
        rectilineal: animation.rectilineal,
        static: animation.static,
        })

        let tags = await this.$axios.get('/api/animationtags/' + animation.id);
        animations.data[index].tags = tags.data.map(tag => {
          return tag.id;
        });
        animation.tags.forEach(async tag => {
          let animationtags = await this.$axios.post('/api/animations/tags/add/', {
            animationId: customanimations.data.id,
            tagId: tag
          })
        })

        let animationsets = this.$axios.post('/api/animationsets/add/', {
          animationId: customanimations.data.id,
          setId: sets.data.id,
        })
    })
    

    req.tagIds.forEach(async tag => {
      let setssettags = await this.$axios.post('/api/setssettags/add/', {
        setId: sets.data.id,
        settagsId: tag,
      }) 
    })
   
    sets.data.videos = animations.data.map(video => {
      return video.video
    })
    //sets.data.tags = setssettags.data;
    sets.data.animations = animations.data;

    commit('addToSets', sets.data);
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
      let videos = await this.$axios.get('/api/sets/animation/' + data[i].id);
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
      data[i].tagIds = tags.data.map(tag => {
        return tag.settagsId;
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