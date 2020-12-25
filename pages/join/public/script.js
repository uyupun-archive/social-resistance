import Button from '~/components/button/index.vue'
import Paginator from '~/components/paginator/index.vue'

export default {
  components: {
    Button,
    Paginator,
  },
  layout: 'after-login/index',
  data() {
    return {
      page: 1,
      limit: 10,
      total: 0,
      worlds: [],
      error: false,
      errorMessage: 'さんかにしっぱいしました',
    }
  },
  mounted() {
    this.searchWorld(this.page)
  },
  methods: {
    async searchWorld(page) {
      const res = await this.$search({ page, limit: this.limit }).catch((e) => {
        this.error = true
        this.errorMessage = e.data.msg
      })
      if (res) {
        this.page = res.page
        this.total = res.total
        this.worlds = res.list
      }
    },
    async joinWorld(worldId) {
      this.error = false
      const res = await this.$join({ worldId }).catch((e) => {
        this.error = true
        this.errorMessage = e.data.msg ? e.data.msg : 'エラーがはっせいしました'
      })
      if (res.validity) {
        const payload = {
          id: worldId,
          token: res.token,
          role: res.role,
        }
        this.$store.commit('world/update', payload)
        this.$router.push('/gohome')
      } else {
        this.error = true
        this.errorMessage = 'さんかにしっぱいしました'
      }
    },
  },
}
