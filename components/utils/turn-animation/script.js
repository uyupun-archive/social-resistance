export default {
  props: {
    count: {
      type: Number,
      require: true,
      default: 1,
    },
    pekora: {
      type: String,
      require: true,
      default: '',
    },
    baikinKun: {
      type: String,
      require: true,
      default: '',
    },
  },
  data() {
    return {
      showAnimation: false,
    }
  },
  mounted() {
    this.playAnimation()
  },
  methods: {
    playAnimation() {
      setTimeout(() => {
        this.showAnimation = false
      }, 2500)
    },
    show() {
      this.showAnimation = true
      this.playAnimation()
    },
  },
}
