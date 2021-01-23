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
      selectedAvatarId: 0,
      currentAvatarId: 0,
      avatarIndex: 0,
      showModal: false,
      errorMsg: '',
    }
  },
  async mounted() {
    this.user = await this.$fetchProfile({ userId: this.userId })
    this.avatars = await this.$fetchAvatar()
    this.selectedAvatarId = this.avatars.find(
      (avatar) => avatar.id === this.user.avatarId
    ).id
    this.currentAvatarId = this.avatars[0].id
  },
  methods: {
    retAvatar(id) {
      const { image } = this.avatars.find((avatar) => avatar.id === id)
      return `${process.env.API_URL + image}`
    },
    retRank() {
      return `${process.env.API_URL + this.user.rank}`
    },
    retHistory() {
      return `${this.user.history.win}勝${this.user.history.lose}負`
    },
    onClick() {
      this.$refs.avatarsModal.open()
    },
    canSave() {
      return this.user.avatarId === this.selectedAvatarId
    },
    selectAvatar() {
      this.selectedAvatarId = this.currentAvatarId
      this.$refs.avatarsModal.close()
    },
    prev() {
      if (this.avatarIndex === 0) this.avatarIndex = this.avatars.length - 1
      else this.avatarIndex -= 1
      this.currentAvatarId = this.avatars[this.avatarIndex].id
    },
    next() {
      if (this.avatarIndex === this.avatars.length - 1) this.avatarIndex = 0
      else this.avatarIndex += 1
      this.currentAvatarId = this.avatars[this.avatarIndex].id
    },
    validate(avatarId) {
      if (!this.avatars.some((avatar) => avatar.id === avatarId)) {
        this.errorMsg = 'ただしいアバターをせんたくしてください'
        return true
      }
      return false
    },
    async onSubmit() {
      this.errorMsg = ''
      if (this.validate(this.selectedAvatarId)) return
      const res = await this.$updateProfile({
        avatarId: this.selectedAvatarId,
      }).catch((e) => {
        this.errorMsg = e.data.msg
      })
      if (res) this.$router.push(`/profile/${this.userId}`)
    },
  },
}
