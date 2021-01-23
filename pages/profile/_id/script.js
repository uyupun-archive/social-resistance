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
  async mounted() {
    const res = await this.$fetchProfile({ userId: this.userId }).catch((e) => {
      this.errorMsg = e.data.msg
    })
    if (res) this.user = res
  },
  methods: {
    makeFullImagePath(path) {
      return `${process.env.API_URL + path}`
    },
    makeBattleHistory() {
      return `${this.user.history.win}勝${this.user.history.lose}負`
    },
  },
}
