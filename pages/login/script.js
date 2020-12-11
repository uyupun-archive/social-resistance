import Button from '~/components/inputs/button/index.vue'
import TextBox from '~/components/inputs/text-box/index.vue'

export default {
  components: {
    Button,
    TextBox,
  },
  data() {
    return {
      userId: '',
      password: '',
      error: false,
    }
  },
  methods: {
    onChangeUserId(e) {
      if (this.error) this.error = false
      this.userId = e.target.value
    },
    onChangePassword(e) {
      if (this.error) this.error = false
      this.password = e.target.value
    },
    checkDisabled() {
      return !this.userId.length || !this.password.length
    },
    onSubmit(e) {
      // TODO: 登録処理
      this.error = true
      this.$store.commit('auth/update', { token: 'token' })
    },
  },
}
