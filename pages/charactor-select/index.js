import Button from '~/components/button/index.vue'

export default {
  components: {
    Button,
  },
  data() {
    return {
      characterselected: false,
    }
  },
  methods: {
    isSelectCharacter() {
      this.characterselected = true
    },
  },
}
