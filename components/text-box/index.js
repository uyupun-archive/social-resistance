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
    readonly: {
      type: Boolean,
      default: false,
    },
    autofocus: {
      type: Boolean,
      default: false,
    },
    align: {
      validator: (align) => {
        return ['left', 'center', 'right'].includes(align)
      },
      default: 'left',
    },
    type: {
      validator: (type) => {
        return ['text', 'password', 'email'].includes(type)
      },
      default: 'text',
    },
  },
  data() {
    return {
      value: '',
    }
  },
  mounted() {
    this.value = this.defaultValue
  },
  methods: {
    onChange(e) {
      this.value = e.target.value
      this.$emit('input', e)
    },
  },
}
