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
      submitError: false,
      errorMsg: '',
      error: {
        userId: {
          state: false,
        },
        password: {
          state: false,
        },
      },
    }
  },
  methods: {
    onChangeUserId(e) {
      if (this.error.userId.state) this.error.userId.state = false
      this.userId = e.target.value
    },
    onChangePassword(e) {
      if (this.error.password.state) this.error.password.state = false
      this.password = e.target.value
    },
    canRegister() {
      return !this.userId || !this.password
    },
    validate(userId, password) {
      let error = false
      if (!userId.match(/^[0-9a-zA-Z_]+$/)) {
        this.error.userId.state = true
        error = true
      }
      if (password.length < 8) {
        this.error.password.state = true
        error = true
      }
      return error
    },
    async onSubmit(e) {
      this.error.userId.state = false
      this.error.password.state = false
      this.submitError = false
      const userId = e.target.userId.value
      const password = e.target.password.value
      if (this.validate(userId, password)) return

      const res = await this.$register({ userId, password }).catch((e) => {
        this.errorMsg = e.data.msg
        this.error.userId.state = true
        this.error.password.state = true
        this.submitError = true
      })
      if (!res) return
      this.$store.commit('auth/update', { userId, token: res.token })
      this.$router.push('/')
    },
  },
}
