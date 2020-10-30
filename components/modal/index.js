export default {
  props: {
    isClickSelf: {
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
      this.isClose = true
      setTimeout(() => {
        this.isClose = false
        this.showModal = false
      }, 300)
    },
    open() {
      this.showModal = true
    },
    onClickSelf() {
      if (this.isClickSelf) this.close()
    },
  },
}
