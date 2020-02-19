<template>
  <div class="Popup">
    <div class="Popup__window">
      <div class="Popup__close" @click="close"></div>
      <h1 class="Popup__title">Create a new Set</h1>
      <div class="Popup__left">
        <h2 class="Popup__headline">Name</h2>
        <p class="Popup__subheadline">Up to 30 characters</p>
        <input v-model="name" maxlength="30" class="Popup__input Popup__name"/>
        <h2 class="Popup__headline">Description</h2>
        <p class="Popup__subheadline">Up to 150 characters</p>
        <textarea v-model="description" maxlength="100" class="Popup__input Popup__description"/>
      </div>
      <div class="Popup__right">
        <h2 class="Popup__headline">Tags</h2>
        <p class="Popup__subheadline">Select at least one</p>
        <div
          class="Popup__tag"
          v-for="tag in displayTags"
          :key="tag.id"
          :class="{ selected : selectedTags.includes(tag) }"
          @click="addTag(tag)"
        >
          {{tag}}
        </div>
      </div>
      <Button
        class="Popup__button"
        :link="'/sets'"
        :label="'Create set'"
        @click.native="addSet"
      ></Button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Popup',
  data() {
    return {
      name: '',
      description: '',
      selectedTags: [],
      tags: []
    };
  },
  computed: {
    displayTags() {
      let displayTags = this.tags.map(tag => {
        return tag.name;
      })
      return displayTags;
    }
  },
  methods: {
    addSet() {
      if(this.name !== '', this.description, this.selectedTags.length > 0){
        let ids = [];
        this.selectedTags.forEach(selectedTag => {
        ids.push(this.tags.find(tag => tag.name === selectedTag).id)
        })
        let req = {
          name: this.name, 
          desc: this.description,
          tags: this.selectedTags,
          tagIds: ids,
        };
        this.$store.dispatch('setoverview/createNewSet', req);
        this.close();
      }
    },
    addTag(tag){
      if(!this.selectedTags.includes(tag)){
        this.selectedTags.push(tag);
      }else {
        this.selectedTags.splice(this.selectedTags.indexOf(tag),1);
      }
    },
    close() {
      this.$emit('popupOpen', false);
    }
  },
  async mounted() {
    let tags = await this.$axios.get('/api/settags');
    this.tags = tags.data;
  }
};
</script>

<style lang="scss">
@import './Popup.scss';
</style>