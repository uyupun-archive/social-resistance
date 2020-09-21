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
            localStorage.worldId = e.target.worldId.value
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
