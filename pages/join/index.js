import Button from '~/components/button/index.vue'
import TextBox from '~/components/text-box/index.vue'

export default {
  components: {
    Button,
    TextBox,
  },
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
            sessionStorage.worldId = e.target.worldId.value
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
        })
    },
  },
}
