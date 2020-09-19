export default {
  props: {
    to: {
      type: String,
      default: '',
    },
    size: {
      validator: (size) => {
        return ['small', 'middle', 'large'].includes(size)
      },
      default: 'middle',
    },
    topLeft: {
      type: Boolean,
      default: false,
    },
    topRight: {
      type: Boolean,
      default: false,
    },
    bottomLeft: {
      type: Boolean,
      default: false,
    },
    bottomRight: {
      type: Boolean,
      default: false,
    },
    type: {
      validator: (type) => {
        return ['button', 'submit', 'reset'].includes(type)
      },
      default: 'button',
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    routerPush() {
      if (this.to) {
        this.$router.push(this.to)
      }
    },
  },
}
