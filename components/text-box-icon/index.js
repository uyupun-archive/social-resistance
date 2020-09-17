export default {
  props: {
    defaultValue: {
      type: String,
      default: '',
    },
    name: {
      type: String,
      default: '',
    },
    icon: {
      validator: (type) => {
        return ['clipboard'].includes(type)
      },
      default: 'clipboard',
    },
    readonly: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      value: this.defaultValue,
    }
  },
  methods: {
    getValue() {
      return this.value
    },
    onClickIcon() {
      this.$emit('onClick')
    },
  },
}
