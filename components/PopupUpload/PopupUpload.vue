<template>
  <div class="Popup">
    <div class="Popup__window">
      <div v-if="importerReady" style="color:white">{{json}}</div>
      <div class="Popup__close" @click="close"></div>
      <h1 class="Popup__title">Upload a set from a file</h1>
      <input class="Popup__upload" type="file" id="file" ref="file" v-on:change="handleFileUpload()"/>
      <Button
        class="Popup__button"
        :link="'/sets'"
        :label="'Upload set'"
        @click.native="addSet"
      ></Button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PopupUpload',
  data() {
    return {
      name: '',
      description: '',
      selectedTags: [],
      tags: [],
      file: '',
      json: null,
      importerReady: false,
    };
  },
  methods: {
    close() {
      this.$emit('popupOpen', false);
    },
    handleFileUpload(){
      this.file = this.$refs.file.files[0];
      
    },
    async addSet(){
      let formData = new FormData();
      formData.append('file', this.file);
      let importer = await this.$axios.post('/upload', formData);
      this.importerReady = true;
      const { data } = await this.$axios.get('/uploads/' + importer.data.file.filename);
      this.$store.dispatch('setoverview/saveFromJSON', data[0]);
      this.close();
      await this.$axios.delete('/test/' + importer.data.file.filename);
    }
  }
};
</script>

<style lang="scss">
@import './PopupUpload.scss';
</style>