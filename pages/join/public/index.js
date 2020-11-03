import Button from '~/components/button/index.vue'

export default {
  components: {
    Button,
  },
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
    joinWorld(worldId) {
      this.error = false
      this.$checkWorldId({ worldId })
        .then((res) => {
          if (res.validity) {
            sessionStorage.worldId = worldId
            sessionStorage.token = res.token
            sessionStorage.role = res.role
            this.$router.push('/gohome')
          } else {
            this.error = true
            this.errorMessage = 'さんかにしっぱいしました'
          }
        })
        .catch((e) => {
          this.error = true
          this.errorMessage = e.data.msg
            ? e.data.msg
            : 'エラーがはっせいしました'
        })
    },
  },
}
