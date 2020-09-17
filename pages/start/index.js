import Button from '~/components/button/index.vue'
import TextBoxIcon from '~/components/text-box-icon/index.vue'
import Tooltip from '~/components/tooltip/index.vue'

export default {
  components: {
    Button,
    TextBoxIcon,
    Tooltip,
  },
  data() {
    return {
      worldId: '',
      showTooltip: false,
      tooltipText: 'コピーしました',
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
      navigator.clipboard
        .writeText(this.worldId)
        .then(() => {
          this.tooltipText = 'コピーしました'
          this.copySuccess()
        })
        .catch(() => {
          this.tooltipText = 'コピーに失敗しました'
          this.copySuccess()
        })
    },
    copySuccess() {
      this.showTooltip = true
      setTimeout(() => {
        this.showTooltip = false
      }, 3000)
    },
    onSubmit(e) {
      // TODO: api叩く
    },
  },
}
