export default {
  layout: 'after-login/index',
  data() {
    return {
      ranks: [],
      errorMsg: '',
    }
  },
  mounted() {
    this.fetchRanks()
  },
  methods: {
    async fetchRanks() {
      const res = await this.$fetchRanks().catch(() => {
        this.errorMsg = 'ランクのしゅとくにしっぱいしました'
      })
      if (res) this.ranks = res.reverse()
    },
    getFullImagePath(path) {
      return process.env.API_URL + path
    },
  },
}
