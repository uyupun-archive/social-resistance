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
      const div10 = num % 10
      const div100 = num % 100
      if (div10 === 1 && div100 !== 11) return `${num}st`
      if (div10 === 2 && div100 !== 12) return `${num}nd`
      if (div10 === 3 && div100 !== 13) return `${num}rd`
      return `${num}th`
    },
    makeFullImagePath(path) {
      return `${process.env.API_URL + path}`
    },
  },
}
