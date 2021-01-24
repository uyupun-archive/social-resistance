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
  async mounted() {
    const resUser = await this.$fetchProfile({ userId: this.userId }).catch(
      (e) => {
        this.errorMsgs.fetch = e.data.msg
      }
    )
    const resAvatars = await this.$fetchAvatar().catch(() => {
      this.errorMsgs.fetch = 'アバターのしゅとくにしっぱいしました'
    })
    if (!resUser || !resAvatars) return
    this.user = resUser
    this.avatars = resAvatars
    this.selectedAvatar = this.avatars.find(
      (avatar) => avatar.id === this.user.avatarId
    )
    this.currentAvatar = this.avatars[0]
  },
  methods: {
    makeFullImagePath(path) {
      return `${process.env.API_URL + path}`
    },
    makeBattleHistory() {
      return `${this.user.history.win}勝${this.user.history.lose}負`
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
