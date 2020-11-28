import Button from '~/components/button/index.vue'
import TextBox from '~/components/text-box/index.vue'

export default {
  components: {
    Button,
    TextBox,
  },
  layout: 'menu/index',
  data() {
    return {
      worldId: '',
      error: false,
      errorMessage: 'さんかにしっぱいしました',
    }
  },
  methods: {
    checkDisabled() {
      return !this.worldId.length
    },
    onChange(e) {
      this.worldId = e.target.value
    },
    onSubmit(e) {
      this.error = false
      this.$checkWorldId({ worldId: e.target.worldId.value })
        .then((res) => {
          if (res.validity) {
            const payload = {
              id: e.target.worldId.value,
              token: res.token,
              role: res.role,
            }
            this.$store.commit('world/update', payload)
            this.$router.push('/gohome')
          } else {
            this.error = true
            this.errorMessage = 'さんかにしっぱいしました'
          }
        })
        .catch((e) => {
          this.error = true
          this.errorMessage = e.data.msg
        })
    },
  },
}
