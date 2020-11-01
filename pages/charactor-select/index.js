import Button from '~/components/button/index.vue'

export default {
  components: {
    Button,
  },
  data() {
    return {
      charaselected: false,
    }
  },
  methods: {
    charaSelect() {
      this.charaselected = true
    },
  },
}
