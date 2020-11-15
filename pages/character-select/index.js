import Button from '~/components/button/index.vue'

export default {
  components: {
    Button,
  },
  layout: 'menu/index',
  data() {
    return {
      isPekoraTab: true,
      currentBaikinkunPointer: 0,
      currentPekoraPointer: 0,
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
      characterSelected: false,
    }
  },
  methods: {
    selectCharacter() {
      this.characterSelected = true
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
