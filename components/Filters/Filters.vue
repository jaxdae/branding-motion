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
      v-if="isVariables"
      class="Filters__tooltip"
    >
      <span class="tooltip tooltip01">
        <span class="Filters__tooltip-headline">Quick tip</span>
        Hover over the labels to see their impact on the brand identity
        </span>
    </div>
    <div 
      v-if="isLocked && !noLockIcon"
      class="Filters__locked"
    ></div>
    <transition-group name="blur-delay">
    <div
      v-for="(filter, index) in filteroptions"
      v-if="!isCollapsed || !collapse"
      :key="filter.left"
      class="Filters__filtergroup"
    >
      <div class="Filters__labels">
        <div class="Filters__label--left" :class="'Filters__label--' + index">
          <span class="tooltip" :class="'tooltip-'+index">{{filter.tooltipleft}}</span>
          {{ filter.left }}
          </div>
        <div class="Filters__label--right" :class="'Filters__label--' + index">
          <span class="tooltip" :class="'tooltip-'+index">{{filter.tooltipright}}</span>
          {{ filter.right }}
          </div>
      </div>
        <div class="Filters__radiogroup">
          <label :class="{ locked : isLocked, locked : !variablesActive[index] && isVariables}"> 
              <input
                :name="filter.left"
                :checked="input[index] === 1"
                @click="check(index, 1)"
                value="1"
                :disabled="isLocked || !variablesActive[index] && isVariables"
                class="Filters__input"
                type="radio"
              />
              <span class="radiobox"></span>
          </label>
            <label :class="{ locked : isLocked, locked : !variablesActive[index] && isVariables}">
              <input
                :name="filter.left"
                :checked="input[index] === 2"
                @click="check(index, 2)"
                value="2"
                :disabled="isLocked || !variablesActive[index] && isVariables"
                class="Filters__input"
                type="radio"
              />
              <span class="radiobox"></span>
          </label>
            <label :class="{ locked : isLocked, locked : !variablesActive[index] && isVariables}">  
              <input
                :name="filter.left"
              :checked="input[index] === 3"
                @click="check(index, 3)"
                value="3"
                :disabled="isLocked || !variablesActive[index] && isVariables"
                class="Filters__input"
                type="radio"
              />
              <span class="radiobox"></span>
          </label>
            <label :class="{ locked : isLocked, locked : !variablesActive[index] && isVariables}">  
              <input
                :name="filter.left"
                :checked="input[index] === 4"
                @click="check(index, 4)"
                value="4"
                :disabled="isLocked || !variablesActive[index] && isVariables"
                class="Filters__input"
                type="radio"
              />
              <span class="radiobox"></span>
          </label>
          <label :class="{ locked : isLocked, locked : !variablesActive[index] && isVariables}">
              <input
                :name="filter.left"
                :checked="input[index] === 5"
                @click="check(index, 5)"
                value="5"
                :disabled="isLocked || !variablesActive[index] && isVariables"
                class="Filters__input"
                type="radio"
              />
              <span class="radiobox"></span>
          </label>
        </div>
    </div>
    </transition-group>
    <Button
      class="Filters__reset"
      v-if="isVariables"
      :link="'/'+this.$route.params.detail"
      :label="'Reset values to default'"
      @click.native="reset"
    >
    </Button>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex';
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
    isvalueset: {
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
    },
    onHome: {
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
      resettedSet: {},
      variablesActive: {
        hard: true,
        rectilineal: true,
        rough: true,
        slow: true,
        static: true,
      }
    };
  },
 
  computed: {
     ...mapGetters({
      currentVariables: 'animationdetail/currentVariables',
      currentBrandSet: 'currentBrandSet',
    }),
    input(){
      if(this.isVariables){
        Object.entries(this.variables).forEach(value => {
          let identity = {};
          identity.name = value[0];
          identity.value = value[1];
          this.$store.commit('animationdetail/setCurrentVariables', identity);
        })
        return this.currentVariables
      }else if(this.isvalueset){
        this.checkboxValues = this.valueset
        return this.checkboxValues;
      }else {
        return this.checkboxValues;
      }    
    }    
  },
  methods: {
    check(valueset, index) { 
      if(!this.isVariables && !this.isvalueset){
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
    reset() {
      Object.entries(this.resettedSet).forEach(value => {
        let identity = {
          name: value[0],
          value: value[1]
        }
        this.$store.commit('animationdetail/setCurrentVariables', identity);
      })
    }
  },
  mounted() {
    if(this.onHome){
    Object.entries(this.currentBrandSet).forEach(identity => {
      this.checkboxValues[identity[0]] = identity[1];
    })
    }
    if(this.variables){
      this.resettedSet = this.variables;
      Object.entries(this.currentVariables).forEach((variable, index) => {
        if(variable[1] == 0){
          this.variablesActive[variable[0]] = false;
        }
    })
    }
  }
};
</script>

<style lang="scss">
@import './Filters.scss';
</style>
