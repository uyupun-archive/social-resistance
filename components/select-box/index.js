export default {
  props: {
    options: {
      type: Array,
      validator(options) {
        return options.every((object) => 'text' in object && 'value' in object)
      },
      default: [],
    },
    selected: {
      type: String,
      default: '',
    },
    name: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      selectModel: this.selected,
    }
  },
  methods: {
    getSelected() {
      return this.selectModel
    },
  },
}
