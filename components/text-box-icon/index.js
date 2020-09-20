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
    onClickIcon() {
      this.$emit('onClick')
    },
  },
}
