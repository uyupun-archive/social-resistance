import Button from '~/components/button/index.vue'

export default {
  components: {
    Button,
  },
  data() {
    return {
      selectTab: Boolean(true),
      slectedTabCharacter: String('うさぎくん'),
      usas: [
        { name: 'チンピラウサギ' },
        { name: 'おはようさぎ' },
        { name: 'ぺこら' },
      ],
      baikins: [
        { name: 'ばいきんくん' },
        { name: 'ふたごばいきん' },
        { name: 'へずまりゅう' },
      ],
      characterselected: false,
    }
  },
  methods: {
    isSelectCharacter() {
      this.characterselected = true
    },
    isSelectTab(value) {
      if (value === true) {
        this.slectedTabCharacter = this.usas[0].name
      } else {
        this.slectedTabCharacter = this.baikins[0].name
      }
    },
  },
}
