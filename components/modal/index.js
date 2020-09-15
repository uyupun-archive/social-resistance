export default {
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
  },
}
