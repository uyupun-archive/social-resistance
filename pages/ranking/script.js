export default {
  layout: 'after-login/index',
  data() {
    return {
      rankings: [],
      errorMsg: '',
    }
  },
  async mounted() {
    const res = await this.$fetchRanking().catch((e) => {
      this.errorMsg = 'ランキングのしゅとくにしっぱいしました'
    })
    if (res) this.rankings = res
  },
  methods: {
    retRank(num) {
      if (num === 1) return `${num}st`
      else if (num === 2) return `${num}nd`
      else if (num === 3) return `${num}rd`
      else return `${num}th`
    },
    retImage(path) {
      return `${process.env.API_URL + path}`
    },
  },
}
