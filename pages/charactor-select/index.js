import Button from '~/components/button/index.vue'

export default {
  components: {
    Button,
  },
  data() {
    return {
      isPekoraTab: true,
      slectedTabCharacter: {
        img: 'https://placehold.jp/430x430.png',
        name: 'うさぎくん',
      },
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
      if (isPekoraTab) {
        this.slectedTabCharacter = this.pekoras[0]
      } else {
        this.slectedTabCharacter = this.baikinkuns[0]
      }
    },
    // prevCharacter() {
    //   this.usas--
    // },
    // nextCharacter() {
    //   this.baikins++
    // },
  },
}
