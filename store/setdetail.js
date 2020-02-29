export const state = () => ({
  setDetail: {},
  setDetailReady: false,
  setRemoved: true,
 
})

export const getters = {
  setDetail: state => {
    return state.setDetail;
  },
  setDetailReady: state => {
    return state.setDetailReady;
  },
  setRemoved: state => {
    return state.setRemoved;
  }
  
}

export const mutations = {
  setDetail: (state, data) => {
    state.setDetail = data;
  },
  setDetailReady: (state, bool) => {
    state.setDetailReady = bool;
  },
  setRemoved: (state, bool) => {
    state.setRemoved = bool;
  },
  removeFromSet: (state, id) => {
    state.setDetailReady = false;
    var filtered = state.setDetail.animations.filter((element) => {
       return element.id != id; 
      });
    state.setDetail.animations = filtered;
    state.setDetailReady = true;
  },
  addToSet: (state, data) => {
    if(state.setDetail){
    state.setDetail.animations.push(data);
    }
  },
  updateSet: (state, set) => {
    let newSet = set;
    newSet.animations = state.setDetail.animations;
    state.setDetail = newSet;
  }
}

export const actions = {
  async getSetDetail({ commit }, id) {

    let { data } = await this.$axios.get('/api/sets/' + id);

    let tags = await this.$axios.get('/api/sets/tags/' + id);
    data[0].tags = tags.data.map(tag => {
      return tag.name;
    });
    data[0].tagIds = tags.data.map(tag => {
      return tag.settagsId;
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
      animations.data[i].tagIds = anitags.data.map(tag => {
        return tag.id;
      });
    }

    data[0].animations = animations.data;
    commit('setDetailReady', true);
    commit('setDetail', data[0]);
  },
  async removeSet({ commit }, id) {
    commit('setRemoved', false);
    let sets  = await this.$axios.delete('/api/sets/remove/' + id);

    let animations = await this.$axios.get('/api/sets/animations/' + id);

    animations.data.forEach(async animation => {
      let animationtags = await this.$axios.delete('/api/animations/tags/remove/' + animation.id)
      
      let customanimations = await this.$axios.delete('/api/animations/remove/' + animation.id);

      let animationsets = await this.$axios.delete('/api/animationsets/remove/' + id);
    })
    
    let setssettags = this.$axios.delete('/api/setssettags/remove/' + id);

    commit('setRemoved', true);
  },
  async updateSet({ commit }, req) {
     let updatedSet = await this.$axios.put('/api/sets/update/' + req.setId, {
      name: req.name,
      description: req.desc
    });
    
    await this.$axios.delete('/api/setssettags/remove/' + req.setId);
    
    req.tagIds.forEach(async tag => {
      await this.$axios.post('/api/setssettags/add/', {
        setId: req.setId,
        settagsId: tag
      })
    })
    
    let set = {}
    set.name = req.name;
    set.description = req.desc;
    set.tags = req.tags;
    set.tagIds = req.tagIds;
    commit('updateSet', set)
  }
}