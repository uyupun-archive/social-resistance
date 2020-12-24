import Button from '~/components/button/index.vue'
import Pagination from '~/components/pagination/index.vue'

export default {
  components: {
    Button,
    Pagination,
  },
  layout: 'after-login/index',
  data() {
    return {
      page: 1,
      limit: 10,
      total: 0,
      pages: [],
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
        this.pagination()
      }
    },
    pagination() {
      this.pages = []
      const pages = Math.ceil(this.total / this.limit)
      let min = 0
      let max = 0
      if (this.page <= 3) {
        min = 1
        max = pages <= 5 ? pages : 5
      } else if (pages < this.page + 2) {
        if (this.page <= 5) min = 1
        else min = pages === this.page ? this.page - 4 : this.page - 3
        max = pages
      } else {
        min = this.page - 2
        max = this.page + 2
      }
      for (let i = 0; i < 5; i++) {
        const num = min + i
        if (num <= max) this.pages.push(num)
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
