export default {
  layout: 'after-login/index',
  data() {
    return {
      rankings: [],
    }
  },
  async mounted() {
    this.rankings = await this.$fetchRanking()
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
