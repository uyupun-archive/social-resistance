import Button from '~/components/button/index.vue'
import TextBoxIcon from '~/components/text-box-icon/index.vue'

export default {
  components: {
    Button,
    TextBoxIcon,
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
    onClickCopy() {
      console.log('copy')
      navigator.clipboard
        .writeText(this.worldId)
        .then(() => {
          console.log('成功')
        })
        .catch(() => alert('コピーに失敗しました'))
    },
    onSubmit(e) {
      // TODO: api叩く
    },
  },
}
