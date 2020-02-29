<template>
  <div class="Popup">
    <div class="Popup__window">
      <div class="Popup__close" @click="close"></div>
      <h1 class="Popup__title">{{displayTitle}}</h1>
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
        :link="displayLink"
        :label="displayButtonText"
        @click.native="addOrEditSet"
      ></Button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Popup',
  props: {
    edit: {
      type: Boolean,
      default: false
    },
    oldName: {
      type: String,
      default: ''
    },
    oldDescription: {
      type: String,
      default: ''
    },
    oldTags: {
      type: Array,
      default: () => []
    },
    setId: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      name: '',
      description: '',
      selectedTags: [],
      tags: []
    };
  },
  computed: {
    displayTitle() {
      if(this.edit){
        return "Edit this set"
      }else{
        return "Create a new Set"
      }
    },
    displayTags() {
      let displayTags = this.tags.map(tag => {
        return tag.name;
      })
      return displayTags;
    },
    displayButtonText() {
      if(this.edit) {
        return "Save set"
      }else {
        return "Create set"
      }
    },
    displayLink() {
      if(this.edit){
        return '/sets/' + this.setId;
      }else{
        return  '/sets'
      }
    }
  },
  methods: {
    addOrEditSet() {
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
          setId: this.setId
        };
        if(this.edit){
          this.$store.dispatch('setdetail/updateSet', req);
        }
        else {
          this.$store.dispatch('setoverview/createNewSet', req);
        }
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
      document.getElementsByTagName('body')[0].classList.remove('hidden');
      this.$emit('popupOpen', false);
    }
  },
  async mounted() {
    let tags = await this.$axios.get('/api/settags');
    this.tags = tags.data;

    if(this.edit){
      this.name = this.oldName;
      this.description = this.oldDescription;
      this.oldTags.forEach(tag => {
        this.selectedTags.push(tag);
      })
    }
  }
};
</script>

<style lang="scss">
@import './Popup.scss';
</style>