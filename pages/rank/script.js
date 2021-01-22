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
}
