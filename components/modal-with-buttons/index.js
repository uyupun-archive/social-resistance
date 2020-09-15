export default {
  props: {
    showAlways: {
      type: Boolean,
      default: false,
    },
    isWrap: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      isClose: false,
      showModal: false,
    }
  },
  methods: {
    close() {
      if (this.showAlways) return
      this.isClose = true
      setTimeout(() => {
        this.isClose = false
        this.showModal = false
      }, 300)
    },
    open() {
      this.showModal = true
    },
  },
}
