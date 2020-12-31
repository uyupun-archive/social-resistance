import Button from '~/components/button/index.vue'
import TextBox from '~/components/text-box/index.vue'

export default {
  components: {
    Button,
    TextBox,
  },
  layout: 'after-login/index',
  data() {
    return {
      worldId: '',
      error: false,
      errorMessage: 'さんかにしっぱいしました',
    }
  },
  methods: {
    canStart() {
      return !this.worldId
    },
    onChange(e) {
      this.worldId = e.target.value
    },
    async onSubmit(e) {
      this.error = false
      this.worldId = ''
      const res = await this.$join({ worldId: e.target.worldId.value }).catch(
        (e) => {
          this.error = true
          this.errorMessage = e.data.msg
        }
      )
      if (!res) return
      const payload = {
        id: e.target.worldId.value,
        token: res.token,
        role: res.role,
      }
      this.$store.commit('world/update', payload)
      this.$router.push('/gohome')
    },
  },
}
