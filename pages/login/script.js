import Button from '~/components/button/index.vue'
import TextBox from '~/components/text-box/index.vue'

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
      errorMsg: '',
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
    canLogin() {
      return !this.userId || !this.password
    },
    validate(userId, password) {
      if (!userId.match(/^[0-9a-zA-Z_]+$/)) {
        this.errorMsg = 'ただしいユーザーIDを入力してください'
        this.error = true
        return true
      }
      if (password.length < 8) {
        this.errorMsg = 'パスワードは8文字以上入力してください'
        this.error = true
        return true
      }
      return false
    },
    async onSubmit(e) {
      this.error = false
      const userId = e.target.userId.value
      const password = e.target.password.value
      if (this.validate(userId, password)) return

      const res = await this.$login({ userId, password }).catch((e) => {
        this.errorMsg = e.data.msg
        this.error = true
      })
      if (!res) return
      this.$store.commit('auth/update', { userId, token: res.token })
      this.$router.push('/')
    },
  },
}
