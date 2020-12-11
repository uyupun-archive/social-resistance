import Button from '~/components/inputs/button/index.vue'

export default {
  components: {
    Button,
  },
  layout: 'after-login/index',
  data() {
    return {
      worlds: [
        { id: 'AAAAAA', role: 1 },
        { id: 'BBBBBB', role: 2 },
        { id: 'CCCCCC', role: 1 },
        { id: 'DDDDDD', role: 2 },
        { id: 'EEEEEE', role: 1 },
        { id: 'FFFFFF', role: 2 },
        { id: 'GGGGGG', role: 1 },
        { id: 'HHHHHH', role: 2 },
      ],
      error: false,
      errorMessage: 'さんかにしっぱいしました',
    }
  },
  methods: {
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
