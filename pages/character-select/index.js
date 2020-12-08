import Button from '~/components/button/index.vue'

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
      pekoras: [
        { img: 'https://placehold.jp/430x430.png', name: 'チンピラウサギ' },
        { img: 'https://placehold.jp/430x430.png', name: 'おはようさぎ' },
        { img: 'https://placehold.jp/430x430.png', name: 'ぺこら' },
      ],
      baikinkuns: [
        { img: 'https://placehold.jp/430x430.png', name: 'ばいきんくん' },
        { img: 'https://placehold.jp/430x430.png', name: 'ふたごばいきん' },
        { img: 'https://placehold.jp/430x430.png', name: 'へずまりゅう' },
      ],
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
        else this.currentPekoraPointer = this.pekoras.length - 1
        return
      }
      if (this.currentBaikinkunPointer > 0) this.currentBaikinkunPointer--
      else this.currentBaikinkunPointer = this.baikinkuns.length - 1
    },
    nextCharacter() {
      if (this.isPekoraTab) {
        if (this.currentPekoraPointer < this.pekoras.length - 1)
          this.currentPekoraPointer++
        else this.currentPekoraPointer = 0
        return
      }
      if (this.currentBaikinkunPointer < this.baikinkuns.length - 1)
        this.currentBaikinkunPointer++
      else this.currentBaikinkunPointer = 0
    },
  },
}
