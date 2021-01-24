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
    makeOrdinalRank(num) {
      const mod10 = num % 10
      const mod100 = num % 100
      if (mod10 === 1 && mod100 !== 11) return `${num}st`
      if (mod10 === 2 && mod100 !== 12) return `${num}nd`
      if (mod10 === 3 && mod100 !== 13) return `${num}rd`
      return `${num}th`
    },
    makeFullImagePath(path) {
      return `${process.env.API_URL + path}`
    },
  },
}
