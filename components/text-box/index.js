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
    getValue() {
      return this.value
    },
  },
}
