<template>
  <div class="PopupUpload">
    <div class="PopupUpload__window">
      <div v-if="importerReady" style="color:white">{{json}}</div>
      <div class="PopupUpload__close" @click="close"></div>
      <h1 class="PopupUpload__title">Upload a set from a file</h1>
      <label class="PopupUpload__upload">
        <input class="PopupUpload__upload-input" type="file" accept=".json" id="file" ref="file" @change="handleFileUpload"/>
        <h2 class="PopupUpload__filename">{{filename}}</h2>
        <p v-if="showFilesize" class="PopupUpload__filesize">{{computedSize}}</p>
      </label>
      <Button
        class="PopupUpload__button"
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
      filename: 'Select a JSON-formatted Set',
      filesize: 0,
      filetype: '',
      showFilesize: false,
    };
  },
  computed: {
    computedSize() {
      if(this.filesize < 1000){
      return this.filesize + ' KB'
      }else {
        return this.filesize/1000 + ' MB'
      }
    }
  },
  methods: {
    close() {
      document.getElementsByTagName('body')[0].classList.remove('hidden');
      this.$emit('popupOpen', false);
    },
    handleFileUpload(e){
      this.file = this.$refs.file.files[0];
      this.filename = e.srcElement.files[0].name;
      this.filesize = e.srcElement.files[0].size;
      this.filetype = e.srcElement.files[0].type;
      this.showFilesize = true;
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