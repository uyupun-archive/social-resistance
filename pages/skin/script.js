import Button from '~/components/button/index.vue'
import { PLAYER_PEKORA, PLAYER_BAIKINKUN } from '~/objects/constants/script.js'

export default {
  components: {
    Button,
  },
  layout: 'after-login/index',
  data() {
    return {
      user: null,
      userId: this.$store.state.auth.userId,
      isPekoraTab: true,
      currentBaikinkunPointer: 0,
      currentPekoraPointer: 0,
      selectedBaikinkun: 0,
      selectedPekora: 0,
      pekoraSkins: null,
      baikinkunSkins: null,
      errorMsgs: {
        fetch: '',
        submit: '',
      },
    }
  },
  async mounted() {
    const resUser = await this.fetchProfile(this.userId)
    const resPekoraSkins = await this.fetchSkins(PLAYER_PEKORA)
    const resBaikinkunSkins = await this.fetchSkins(PLAYER_BAIKINKUN)
    if (!resUser || !resPekoraSkins || !resBaikinkunSkins) return
    this.user = resUser
    this.pekoraSkins = resPekoraSkins
    this.baikinkunSkins = resBaikinkunSkins
  },
  methods: {
    async fetchProfile(userId) {
      return await this.$fetchProfile({ userId }).catch((e) => {
        this.errorMsgs.fetch = e.data.msg
      })
    },
    async fetchSkins(role) {
      return await this.$fetchSkins({ role }).catch((e) => {
        this.errorMsgs.fetch = e.data.msg
      })
    },
    selectSkin() {
      if (this.isPekoraTab) this.selectedPekora = this.currentPekoraPointer
      else this.selectedBaikinkun = this.currentBaikinkunPointer
    },
    isSelectedSkin() {
      if (this.isPekoraTab)
        return this.selectedPekora === this.currentPekoraPointer
      return this.selectedBaikinkun === this.currentBaikinkunPointer
    },
    switchTab(isPekoraTab) {
      this.isPekoraTab = isPekoraTab
    },
    prevSkin() {
      if (this.isPekoraTab) {
        if (this.currentPekoraPointer > 0) this.currentPekoraPointer--
        else this.currentPekoraPointer = this.pekoraSkins.length - 1
        return
      }
      if (this.currentBaikinkunPointer > 0) this.currentBaikinkunPointer--
      else this.currentBaikinkunPointer = this.baikinkunSkins.length - 1
    },
    nextSkin() {
      if (this.isPekoraTab) {
        if (this.currentPekoraPointer < this.pekoraSkins.length - 1)
          this.currentPekoraPointer++
        else this.currentPekoraPointer = 0
        return
      }
      if (this.currentBaikinkunPointer < this.baikinkunSkins.length - 1)
        this.currentBaikinkunPointer++
      else this.currentBaikinkunPointer = 0
    },
    makeFullImagePath(path) {
      return `${process.env.API_URL + path}`
    },
  },
}
