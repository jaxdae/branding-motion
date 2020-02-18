<template>
  <div :class="{ collapsed: isCollapsed }" class="Filters">
    <div :class="{ collapsed: isCollapsed }" class="Filters__headline">
      {{ name }}
    </div>
    <div
      v-if="collapse"
      @click="collapseTraits"
      :class="{ collapsed: isCollapsed }"
      class="Filters__collapse"
    ></div>
    <div 
      v-if="isLocked && !noLockIcon"
      class="Filters__locked"
    ></div>
    <div
      v-for="(filter, index) in filteroptions"
      v-if="!isCollapsed || !collapse"
      :key="filter.left"
      class="Filters__filtergroup"
    >
      <div class="Filters__labels">
        <div class="Filters__label--left">{{ filter.left }}</div>
        <div class="Filters__label--right">{{ filter.right }}</div>
      </div>
      <div class="Filters__radiogroup">
        <input
          :name="filter.left"
          :checked="test[index] === 1"
          @click="check(index, 1)"
          value="1"
          :disabled="isLocked"
          class="Filters__input"
          type="radio"
        />
        <input
          :name="filter.left"
           :checked="test[index] === 2"
          @click="check(index, 2)"
          value="2"
          :disabled="isLocked"
          class="Filters__input"
          type="radio"
        />
        <input
          :name="filter.left"
         :checked="test[index] === 3"
          @click="check(index, 3)"
          value="3"
          :disabled="isLocked"
          class="Filters__input"
          type="radio"
        />
        <input
          :name="filter.left"
          :checked="test[index] === 4"
          @click="check(index, 4)"
          value="4"
          :disabled="isLocked"
          class="Filters__input"
          type="radio"
        />
        <input
          :name="filter.left"
          :checked="test[index] === 5"
          @click="check(index, 5)"
          value="5"
          :disabled="isLocked"
          class="Filters__input"
          type="radio"
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Filters',
  props: {
    filteroptions: {
      type: Object,
      required: true
    },
    collapse: {
      type: Boolean,
      default: false
    },
    name: {
      type: String,
      default: 'Brand identity'
    },
    valueset: {
      type: Object,
      default: () => {}
    },
    variables: {
      type: Object,
      default: () => {}
    },
    isValueSet: {
      type: Boolean,
      default: false
    },
    isVariables: {
      type: Boolean,
      default: false
    },
    isLocked: {
      type: Boolean,
      default: false,
    },
    noLockIcon: {
      type: Boolean,
      default: false,
    }
  },
  data() {
    return {
      checkboxValues: {
        rational: 0,
        innovative: 0,
        maskuline: 0,
        personal: 0,
        serious: 0,
        luxurious: 0,
        delicate: 0,
        simple: 0,
      },
      isCollapsed: false,
      isSet: false,
    };
  },
 
  computed: {
    test(){
      if(this.valueset && this.isValueSet){
        this.checkboxValues = this.valueset
      }
      if(this.variables && this.isVariables){
        this.checkboxValues = this.variables
        Object.entries(this.checkboxValues).forEach(value => {
          let identity = {};
          identity.name = value[0];
          identity.value = value[1];
          this.$store.commit('animationdetail/setCurrentVariables', identity);
        })
      }
      return this.checkboxValues;
    }
    
  },
  methods: {
    check(valueset, index) { 
      console.log(valueset, index)
      if(!this.isVariables && !this.isValueSet){
      if (parseInt(this.checkboxValues[valueset]) === index) {
        this.checkboxValues[valueset] = 0;
        this.$store.commit('removeValue', valueset);
        this.$store.commit('disableFilter');
        this.$store.commit('calculateScore');
      } else {
        let identity = {};
        identity.name = valueset;
        identity.value = index;
        this.$store.commit('changeValues', identity);
        this.$store.commit('enableFilter');
        this.$store.commit('calculateScore');
        this.checkboxValues[valueset] = index;
      }
      }else{
        let identity = {};
        identity.name = valueset;
        identity.value = index;
        this.$store.commit('animationdetail/setCurrentVariables', identity);
      }
    },
    collapseTraits() {
      if (this.isCollapsed) {
        this.isCollapsed = false;
        this.$emit('isCollapsed', true);
      } else {
        this.isCollapsed = true;
        this.$emit('isCollapsed', false);
      }
    },
  },
};
</script>

<style lang="scss">
@import './Filters.scss';
</style>
