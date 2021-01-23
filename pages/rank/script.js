export default {
  layout: 'after-login/index',
  data() {
    return {
      ranks: [],
      errorMsg: '',
    }
  },
  async mounted() {
    const res = await this.$fetchRanks().catch((e) => {
      this.errorMsg = 'ランクのしゅとくにしっぱいしました'
    })
    if (res) this.ranks = res.reverse()
  },
  methods: {
    retImage(path) {
      return `${process.env.API_URL + path}`
    },
  },
}
