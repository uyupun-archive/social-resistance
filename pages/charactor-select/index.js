import Button from '~/components/button/index.vue'

export default {
  components: {
    Button,
  },
  data() {
    return {
      isPekoraTab: true,
      currentBaikinkun: 0,
      currentPekora: 0,

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
      characterselected: false,
    }
  },
  methods: {
    isSelectCharacter() {
      this.characterselected = true
    },
    toggleSelectTab(isPekoraTab) {
      this.isPekoraTab = isPekoraTab
    },
    prevCharacter() {
      if (this.isPekoraTab) {
        if (this.currentPekora > 0) {
          this.currentPekora--
        } else {
          this.currentPekora = this.pekoras.length - 1
        }
      } else if (this.currentBaikinkun > 0) {
        this.currentBaikinkun--
      } else {
        this.currentBaikinkun = this.baikinkuns.length - 1
      }
    },
    nextCharacter() {
      if (this.isPekoraTab) {
        if (this.currentPekora < this.pekoras.length - 1) {
          this.currentPekora++
        } else {
          this.currentPekora = 0
        }
      } else if (this.currentBaikinkun < this.baikinkuns.length - 1) {
        this.currentBaikinkun++
      } else {
        this.currentBaikinkun = 0
      }
    },
  },
}
