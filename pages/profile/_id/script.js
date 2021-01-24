import Button from '~/components/button/index.vue'

export default {
  components: {
    Button,
  },
  layout: 'after-login/index',
  data() {
    return {
      user: null,
      userId: this.$store.state.auth.userId,
      errorMsg: '',
    }
  },
  mounted() {
    this.fetchProfile(this.userId)
  },
  methods: {
    async fetchProfile(userId) {
      const res = await this.$fetchProfile({ userId }).catch((e) => {
        this.errorMsg = e.data.msg
      })
      if (res) this.user = res
    },
    getFullImagePath(path) {
      return process.env.API_URL + path
    },
    formatHistory() {
      return `${this.user.history.win}勝${this.user.history.lose}敗`
    },
  },
}
