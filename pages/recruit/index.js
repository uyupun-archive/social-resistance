import SelectBox from '~/components/select-box/index.vue'
import Button from '~/components/button/index.vue'
import TextBoxIcon from '~/components/text-box-icon/index.vue'
import Tooltip from '~/components/tooltip/index.vue'
import {
  PLAYER_PEKORA,
  PLAYER_BAIKINKUN,
} from '~/components/constants/index.js'

export default {
  components: {
    SelectBox,
    Button,
    TextBoxIcon,
    Tooltip,
  },
  data() {
    return {
      worldId: '',
      options: [
        {
          text: 'うさぎさん',
          value: PLAYER_PEKORA,
        },
        {
          text: 'ばいきんくん',
          value: PLAYER_BAIKINKUN,
        },
      ],
      selected: PLAYER_PEKORA,
      tooltip: {
        exists: false,
        text: 'コピーしました',
      },
      error: {
        state: false,
        msg: 'ぼしゅうにしっぱいしました',
      },
    }
  },
  methods: {
    onClickCopy() {
      navigator.clipboard
        .writeText(this.worldId)
        .then(() => {
          this.tooltip.text = 'コピーしました'
        })
        .catch(() => {
          this.tooltip.text = 'コピーに失敗しました'
        })
        .finally(() => {
          this.showTooltip()
        })
    },
    showTooltip() {
      this.tooltip.exists = true
      setTimeout(() => {
        this.tooltip.exists = false
      }, 3000)
    },
    onSubmit(e) {
      this.$generateWorldId({ recruit: e.target.characterSelect.value })
        .then((res) => {
          this.error.state = false
          this.worldId = res.worldId
          sessionStorage.worldId = res.worldId
          sessionStorage.token = res.token
          sessionStorage.role = res.role
        })
        .catch((e) => {
          this.error.state = true
          this.error.msg = e.data.msg
        })
    },
  },
}
