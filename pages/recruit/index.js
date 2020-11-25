import SelectBox from '~/components/select-box/index.vue'
import Button from '~/components/button/index.vue'
import RadioButton from '~/components/radio-button/index.vue'
import TextBoxIcon from '~/components/text-box-icon/index.vue'
import Tooltip from '~/components/tooltip/index.vue'
import {
  PLAYER_PEKORA,
  PLAYER_BAIKINKUN,
} from '~/components/constants/index.js'

export default {
  components: {
    SelectBox,
    RadioButton,
    Button,
    TextBoxIcon,
    Tooltip,
  },
  layout: 'menu/index',
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
      error: false,
      pekoraImg: `${process.env.API_URL}/images/objects/pekora.gif`,
      baikinkunImg: `${process.env.API_URL}/images/objects/baikinkun_1.gif`,
      player: {
        pekora: PLAYER_PEKORA,
        baikinkun: PLAYER_BAIKINKUN,
      },
      selectedValue: PLAYER_PEKORA,
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
    onChange(value) {
      this.selectedValue = value
    },
    onSubmit(e) {
      this.error = false
      const recruit = Number(e.target.characterSelect.value)
      this.$recruit({ recruit })
        .then((res) => {
          this.worldId = res.worldId
          sessionStorage.worldId = res.worldId
          sessionStorage.token = res.token
          sessionStorage.role = res.role
        })
        .catch((e) => {
          this.error = true
        })
    },
  },
}
