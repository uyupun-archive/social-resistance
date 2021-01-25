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
      currentPekoraPointer: 0,
      currentBaikinkunPointer: 0,
      selectedPekoraPointer: 0,
      selectedBaikinkunPointer: 0,
      pekoraSkins: null,
      baikinkunSkins: null,
      errorMsgs: {
        fetch: '',
        submit: '',
      },
    }
  },
  async mounted() {
    await this.init()
    this.setSkin()
  },
  methods: {
    async init() {
      this.user = await this.fetchProfile(this.userId)
      this.pekoraSkins = await this.fetchSkins(PLAYER_PEKORA)
      this.baikinkunSkins = await this.fetchSkins(PLAYER_BAIKINKUN)
    },
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
    setSkin() {
      this.pekoraSkins.some((skin, index) => {
        if (skin.id !== this.user?.skin.pekoraId) return false
        this.selectedPekoraPointer = index
        return true
      })
      this.baikinkunSkins.some((skin, index) => {
        if (skin.id !== this.user?.skin.baikinkunId) return false
        this.selectedBaikinkunPointer = index
        return true
      })
    },
    isSelectedSkin() {
      if (this.isPekoraTab)
        return this.selectedPekoraPointer === this.currentPekoraPointer
      return this.selectedBaikinkunPointer === this.currentBaikinkunPointer
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
    validate(id, role) {
      if (![PLAYER_PEKORA, PLAYER_BAIKINKUN].includes(role)) return true
      if (this.isPekoraTab)
        return !this.pekoraSkins.find((skin) => skin.id === id)
      else return !this.baikinkunSkins.find((skin) => skin.id === id)
    },
    async updateSkins(id, role) {
      return await this.$updateSkins({ id, role }).catch((e) => {
        this.errorMsgs.submit = e.data.msg
      })
    },
    async selectSkin() {
      if (this.isPekoraTab)
        this.selectedPekoraPointer = this.currentPekoraPointer
      else this.selectedBaikinkunPointer = this.currentBaikinkunPointer

      const id = this.isPekoraTab
        ? this.pekoraSkins[this.selectedPekoraPointer].id
        : this.baikinkunSkins[this.selectedBaikinkunPointer].id
      const role = this.isPekoraTab ? PLAYER_PEKORA : PLAYER_BAIKINKUN
      if (this.validate(id, role)) {
        this.errorMsgs.submit = 'ただしいスキンをせんたくしてください'
        return
      }

      const res = await this.updateSkins(id, role)
      if (!res) return
      if (this.isPekoraTab)
        this.selectedPekoraPointer = this.currentPekoraPointer
      else this.selectedBaikinkunPointer = this.currentBaikinkunPointer
    },
  },
}
