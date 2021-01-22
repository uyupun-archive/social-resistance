export default {
  layout: 'after-login/index',
  data() {
    return {
      ranks: [],
    }
  },
  async mounted() {
    this.ranks = (await this.$fetchRanks()).reverse()
  },
  methods: {
    retImage(path) {
      return `${process.env.API_URL + path}`
    },
  },
}
