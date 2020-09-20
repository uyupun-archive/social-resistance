import Button from '~/components/button/index.vue'
import TextBox from '~/components/text-box/index.vue'

export default {
  components: {
    Button,
    TextBox,
  },
  methods: {
    onSubmit(e) {
      // worldIdには実際にはテキストボックスの値が入るようにする
      // というか、テキストボックスからカーソルが外れたタイミングでAPIが走るようにしないと駄目じゃんね
      // たかしあとはたのんだ
      const worldId = 'xxxxxx'
      this.$checkWorldId({ worldId }).then((res) => {
        if (res.validity) console.log('「はじめる」をenableにする')
        else console.log('エラーメッセージを出す')
      })
    },
  },
}
