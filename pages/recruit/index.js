import SelectBox from '~/components/select-box/index.vue'
import Button from '~/components/button/index.vue'
import TextBoxIcon from '~/components/text-box-icon/index.vue'
import Tooltip from '~/components/tooltip/index.vue'

export default {
  components: {
    SelectBox,
    Button,
    TextBoxIcon,
    Tooltip,
  },
  data() {
    return {
      worldId: 'ABCDEF',
      options: [
        {
          text: 'うさぎさん',
          value: '1',
        },
        {
          text: 'ばいきんくん',
          value: '2',
        },
      ],
      selected: '1',
      existsTooltip: false,
      tooltipText: 'コピーしました',
    }
  },
  methods: {
    onClickCopy() {
      navigator.clipboard
        .writeText(this.worldId)
        .then(() => {
          this.tooltipText = 'コピーしました'
          this.showTooltip()
        })
        .catch(() => {
          this.tooltipText = 'コピーに失敗しました'
          this.showTooltip()
        })
    },
    showTooltip() {
      this.existsTooltip = true
      setTimeout(() => {
        this.existsTooltip = false
      }, 3000)
    },
    onSubmit(e) {
      // TODO: api叩く
    },
  },
}
