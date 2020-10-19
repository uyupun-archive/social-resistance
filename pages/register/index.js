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
      if (this.submitError) this.submitError = false
      this.userId = e.target.value
    },
    onChangePassword(e) {
      if (this.error.password.state) this.error.password.state = false
      if (this.submitError) this.submitError = false
      this.password = e.target.value
    },
    checkDisabled() {
      return !this.userId.length || !this.password.length
    },
    onSubmit(e) {
      // TODO: 登録処理
      this.error.userId.state = true
      this.error.password.state = true
      this.submitError = true
    },
  },
}
