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
      // worldIdには実際にはテキストボックスの値が入るようにする
      const worldId = 'xxxxxx'
      this.$checkWorldId({ worldId }).then((res) => {
        if (res.validity) console.log('「はじめる」をenableにする')
        else console.log('エラーメッセージを出す')
      })
    },
  },
}
