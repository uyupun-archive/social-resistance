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
      currentPekoraIndex: 0,
      currentBaikinkunIndex: 0,
      selectedPekoraIndex: 0,
      selectedBaikinkunIndex: 0,
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
      this.pekoraSkins?.some((skin, index) => {
        if (skin.id !== this.user?.skin.usagisanId) return false
        this.selectedPekoraIndex = index
        return true
      })
      this.baikinkunSkins?.some((skin, index) => {
        if (skin.id !== this.user?.skin.baikinkunId) return false
        this.selectedBaikinkunIndex = index
        return true
      })
    },
    isSelectedSkin() {
      if (this.isPekoraTab)
        return this.selectedPekoraIndex === this.currentPekoraIndex
      return this.selectedBaikinkunIndex === this.currentBaikinkunIndex
    },
    switchTab(isPekoraTab) {
      this.isPekoraTab = isPekoraTab
    },
    prevSkin() {
      if (this.isPekoraTab) {
        if (this.currentPekoraIndex > 0) this.currentPekoraIndex--
        else this.currentPekoraIndex = this.pekoraSkins.length - 1
        return
      }
      if (this.currentBaikinkunIndex > 0) this.currentBaikinkunIndex--
      else this.currentBaikinkunIndex = this.baikinkunSkins.length - 1
    },
    nextSkin() {
      if (this.isPekoraTab) {
        if (this.currentPekoraIndex < this.pekoraSkins.length - 1)
          this.currentPekoraIndex++
        else this.currentPekoraIndex = 0
        return
      }
      if (this.currentBaikinkunIndex < this.baikinkunSkins.length - 1)
        this.currentBaikinkunIndex++
      else this.currentBaikinkunIndex = 0
    },
    makeFullImagePath(path) {
      return `${process.env.API_URL + path}`
    },
    getCurrentSkinId() {
      if (this.isPekoraTab) return this.pekoraSkins[this.currentPekoraIndex].id
      return this.baikinkunSkins[this.currentBaikinkunIndex].id
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
      const id = this.getCurrentSkinId()
      const role = this.isPekoraTab ? PLAYER_PEKORA : PLAYER_BAIKINKUN
      if (this.validate(id, role)) {
        this.errorMsgs.submit = 'ただしいスキンをせんたくしてください'
        return
      }

      const res = await this.updateSkins(id, role)
      if (!res) return
      if (this.isPekoraTab) this.selectedPekoraIndex = this.currentPekoraIndex
      else this.selectedBaikinkunIndex = this.currentBaikinkunIndex
    },
  },
}
