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
      const remainder = {
        10: num % 10,
        100: num % 100,
      }
      if (remainder[10] === 1 && remainder[100] !== 11) return `${num}st`
      else if (remainder[10] === 2 && remainder[100] !== 12) return `${num}nd`
      else if (remainder[10] === 3 && remainder[100] !== 13) return `${num}rd`
      else return `${num}th`
    },
    makeFullImagePath(path) {
      return `${process.env.API_URL + path}`
    },
  },
}
