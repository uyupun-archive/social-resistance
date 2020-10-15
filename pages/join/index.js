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
      error: {
        state: false,
        msg: 'さんかにしっぱいしました',
      },
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
      this.$checkWorldId({ worldId: e.target.worldId.value })
        .then((res) => {
          if (res.validity) {
            this.error.state = false
            sessionStorage.worldId = e.target.worldId.value
            sessionStorage.token = res.token
            sessionStorage.role = res.role
            this.$router.push('/gohome')
          } else {
            this.error.state = true
            this.error.msg = 'さんかにしっぱいしました'
          }
        })
        .catch((e) => {
          this.error.state = true
          this.error.msg = e.data.msg
        })
    },
  },
}
