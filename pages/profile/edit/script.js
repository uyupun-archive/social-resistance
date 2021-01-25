import Button from '~/components/button/index.vue'
import TextBox from '~/components/text-box/index.vue'
import Modal from '~/components/modal/index.vue'

export default {
  components: {
    Button,
    TextBox,
    Modal,
  },
  layout: 'after-login/index',
  data() {
    return {
      user: null,
      userId: this.$store.state.auth.userId,
      avatars: null,
      selectedAvatar: null,
      currentAvatar: null,
      avatarIndex: 0,
      showModal: false,
      errorMsgs: {
        fetch: '',
        submit: '',
      },
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    async init() {
      this.user = await this.fetchProfile(this.userId)
      this.avatars = await this.fetchAvatar()
      if (!this.user || !this.avatars) return
      this.setAvatar()
    },
    async fetchProfile(userId) {
      return await this.$fetchProfile({ userId }).catch((e) => {
        this.errorMsgs.fetch = e.data.msg
      })
    },
    async fetchAvatar() {
      return await this.$fetchAvatar().catch(() => {
        this.errorMsgs.fetch = 'アバターのしゅとくにしっぱいしました'
      })
    },
    setAvatar() {
      this.selectedAvatar = this.avatars.find(
        (avatar) => avatar.id === this.user.avatarId
      )
      this.currentAvatar = this.avatars[0]
    },
    getFullImagePath(path) {
      return process.env.API_URL + path
    },
    formatHistory() {
      return `${this.user.history.win}勝${this.user.history.lose}敗`
    },
    onClick() {
      this.$refs.avatarsModal.open()
    },
    canSave() {
      return this.user.avatarId === this.selectedAvatar.id
    },
    selectAvatar() {
      this.selectedAvatar = this.currentAvatar
      this.$refs.avatarsModal.close()
    },
    prev() {
      if (this.avatarIndex === 0) this.avatarIndex = this.avatars.length - 1
      else this.avatarIndex -= 1
      this.currentAvatar = this.avatars[this.avatarIndex]
    },
    next() {
      if (this.avatarIndex === this.avatars.length - 1) this.avatarIndex = 0
      else this.avatarIndex += 1
      this.currentAvatar = this.avatars[this.avatarIndex]
    },
    validate(avatarId) {
      if (!this.avatars.some((avatar) => avatar.id === avatarId)) {
        this.errorMsgs.submit = 'ただしいアバターをせんたくしてください'
        return true
      }
      return false
    },
    async onSubmit() {
      this.errorMsgs.submit = ''
      if (this.validate(this.selectedAvatar.id)) return
      const res = await this.$updateProfile({
        avatarId: this.selectedAvatar.id,
      }).catch((e) => {
        this.errorMsg = e.data.msg
      })
      if (res) this.$router.push(`/profile/${this.userId}`)
    },
  },
}
