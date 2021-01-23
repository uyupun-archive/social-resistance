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
    }
  },
  async mounted() {
    this.user = await this.$fetchProfile({ userId: this.userId })
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
