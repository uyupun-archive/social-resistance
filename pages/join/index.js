import Button from '~/components/button/index.vue'
import TextBox from '~/components/text-box/index.vue'

export default {
  components: {
    Button,
    TextBox,
  },
  data() {
    return {
      worldId: '',
      error: false,
    }
  },
  methods: {
    checkDisabled() {
      return !this.worldId.length
    },
    onChange(e) {
      this.worldId = e.target.value
    },
    onSubmit(e) {
      // TODO: api叩く
      if (e.target.worldId.value === 'error') {
        this.error = true
        return
      }
      this.$router.push('/gohome')
    },
  },
}
