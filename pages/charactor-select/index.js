import Button from '~/components/button/index.vue'

export default {
  components: {
    Button,
  },
  data() {
    return {
      selectTab: Boolean(true),
      charactersUsa: ['チンピラウサギ', 'ノーマルウサギ'],
      charactersBaikin: ['バイキンくん', '双子ばいきん'],
      characterselected: false,
    }
  },
  methods: {
    isSelectCharacter() {
      this.characterselected = true
    },
    isSelectTab(value) {
      if (value === true) {
        console.log(this.charactersUsa[0])
      } else {
        console.log(this.charactersBaikin[0])
      }
    },
  },
}
