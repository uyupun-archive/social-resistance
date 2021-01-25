export default {
  layout: 'after-login/index',
  data() {
    return {
      rankings: [],
      errorMsg: '',
    }
  },
  mounted() {
    this.fetchRanking()
  },
  methods: {
    async fetchRanking() {
      const res = await this.$fetchRanking().catch(() => {
        this.errorMsg = 'ランキングのしゅとくにしっぱいしました'
      })
      if (res) this.rankings = res
    },
    convertNumberToOrdinal(num) {
      const mod10 = num % 10
      const mod100 = num % 100
      if (mod10 === 1 && mod100 !== 11) return `${num}st`
      if (mod10 === 2 && mod100 !== 12) return `${num}nd`
      if (mod10 === 3 && mod100 !== 13) return `${num}rd`
      return `${num}th`
    },
    getFullImagePath(path) {
      return process.env.API_URL + path
    },
  },
}
