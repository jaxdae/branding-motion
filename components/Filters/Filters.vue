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
          v-model="checkboxValues[index]"
          @click="check(index, 1)"
          value="1"
          class="Filters__input"
          type="radio"
        />
        <input
          :name="filter.left"
          v-model="checkboxValues[index]"
          @click="check(index, 2)"
          value="2"
          class="Filters__input"
          type="radio"
        />
        <input
          :name="filter.left"
          v-model="checkboxValues[index]"
          @click="check(index, 3)"
          value="3"
          class="Filters__input"
          type="radio"
        />
        <input
          :name="filter.left"
          v-model="checkboxValues[index]"
          @click="check(index, 4)"
          value="4"
          class="Filters__input"
          type="radio"
        />
        <input
          :name="filter.left"
          v-model="checkboxValues[index]"
          @click="check(index, 5)"
          value="5"
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
    }
  },
  data() {
    return {
      checkboxValues: {},
      isCollapsed: false
    };
  },
  watch: {
    valueset: function(){
      this.checkboxValues = this.valueset;
    }
  },
  methods: {
    check(valueset, index) { 
      if (parseInt(this.checkboxValues[valueset]) === index) {
        this.checkboxValues[valueset] = null;
        delete this.checkboxValues[valueset];
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
    }
  }
};
</script>

<style lang="scss">
@import './Filters.scss';
</style>
