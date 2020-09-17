import Button from '~/components/button/index.vue'

export default {
  components: {
    Button,
  },
  data() {
    return {
      worldId: '',
    }
  },
  mounted() {
    this.worldId = this.getWorldId()
  },
  methods: {
    getWorldId() {
      // worldId を取得 vuex 使用するかも
      return 'ABCDEF'
    },
    onSubmit(e) {
      // TODO: api叩く
    },
  },
}
