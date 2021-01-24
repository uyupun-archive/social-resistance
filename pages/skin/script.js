import Button from '~/components/button/index.vue'
import { PLAYER_PEKORA, PLAYER_BAIKINKUN } from '~/objects/constants/script.js'

export default {
  components: {
    Button,
  },
  layout: 'after-login/index',
  data() {
    return {
      isPekoraTab: true,
      currentBaikinkunPointer: 0,
      currentPekoraPointer: 0,
      selectedBaikinkun: 0,
      selectedPekora: 0,
      pekoraSkins: null,
      baikinkunSkins: null,
      errorMsg: '',
    }
  },
  async mounted() {
    const resPekoraSkins = await this.$fetchSkins({
      role: PLAYER_PEKORA,
    }).catch((e) => {
      this.errorMsg = e.data.msg
    })
    const resBaikinkunSkins = await this.$fetchSkins({
      role: PLAYER_BAIKINKUN,
    }).catch((e) => {
      this.errorMsg = e.data.msg
    })
    if (resPekoraSkins && resBaikinkunSkins) {
      this.pekoraSkins = resPekoraSkins
      this.baikinkunSkins = resBaikinkunSkins
    }
  },
  methods: {
    selectCharacter() {
      if (this.isPekoraTab) this.selectedPekora = this.currentPekoraPointer
      else this.selectedBaikinkun = this.currentBaikinkunPointer
    },
    isSelectedCharacter() {
      if (this.isPekoraTab)
        return this.selectedPekora === this.currentPekoraPointer
      return this.selectedBaikinkun === this.currentBaikinkunPointer
    },
    switchTab(isPekoraTab) {
      this.isPekoraTab = isPekoraTab
    },
    prevCharacter() {
      if (this.isPekoraTab) {
        if (this.currentPekoraPointer > 0) this.currentPekoraPointer--
        else this.currentPekoraPointer = this.pekoraSkins.length - 1
        return
      }
      if (this.currentBaikinkunPointer > 0) this.currentBaikinkunPointer--
      else this.currentBaikinkunPointer = this.baikinkunSkins.length - 1
    },
    nextCharacter() {
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
