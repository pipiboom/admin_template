<template>
  <button
    class="el-button"
    @click="handleClick"
    :disabled="buttonDisabled || loading"
    :autofocus="autofocus"
    :type="nativeType"
    :class="[
      type ? 'el-button--' + type : '',
      buttonSize ? 'el-button--' + buttonSize : '',
      {
        'is-disabled': buttonDisabled,
        'is-loading': loading || debounce,
        'is-plain': plain,
        'is-round': round,
        'is-circle': circle
      }
    ]"
  >
    <i
      class="el-icon-loading"
      v-if="loading || debounce"
    />
    <i
      :class="icon"
      v-if="icon && (!loading && !debounce)"
    />
    <span v-if="$slots.default">
      <slot />
    </span>
  </button>
</template>
<script>
export default {
  name: "ElButton",

  inject: {
    elForm: {
      default: ""
    },
    elFormItem: {
      default: ""
    }
  },

  props: {
    type: {
      type: String,
      default: "default"
    },
    size: {
      type: String,
      default: ""
    },
    icon: {
      type: String,
      default: ""
    },
    loading: Boolean,
    nativeType: {
      type: String,
      default: "button"
    },
    defalutDisable: {
      type: Boolean,
      default: false
    },
    isDebounce: {
      type: Boolean,
      default: false
    },
    disabled: Boolean,
    plain: Boolean,
    autofocus: Boolean,
    round: Boolean,
    circle: Boolean
  },
  data: function() {
    return {
      debounce: false
    };
  },
  computed: {
    _elFormItemSize() {
      return (this.elFormItem || {}).elFormItemSize;
    },
    buttonSize() {
      return this.size || this._elFormItemSize || (this.$ELEMENT || {}).size;
    },
    buttonDisabled() {
      if (this.defalutDisable && !this.disabled) {
        return this.$parent.$parent.tableSelectArr.length === 0;
      }
      return this.disabled || (this.elForm || {}).disabled;
    }
  },
  methods: {
    handleClick(evt) {
      if (this.isDebounce && !this.loading) {
        this.debounce = true;
      }
      this.$emit("click", evt, this);
    }
  }
};
</script>
