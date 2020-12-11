import SelectBox from '~/components/inputs/select-box/index.vue'
import Button from '~/components/inputs/button/index.vue'
import RadioGroup from '~/components/inputs/radio-group/index.vue'
import TextBoxIcon from '~/components/inputs/text-box-icon/index.vue'
import Tooltip from '~/components/data-display/tooltip/index.vue'
import { PLAYER_PEKORA, PLAYER_BAIKINKUN } from '~/objects/constants/script.js'

export default {
  components: {
    SelectBox,
    RadioGroup,
    Button,
    TextBoxIcon,
    Tooltip,
  },
  layout: 'after-login/index',
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
      radioOptions: [
        {
          text: 'こうかい',
          id: 'public',
          value: 'public',
          name: 'visibility',
          checked: true,
        },
        {
          text: 'ひこうかい',
          id: 'private',
          value: 'private',
          name: 'visibility',
          checked: false,
        },
      ],
    }
  },
  methods: {
    async onClickCopy() {
      await navigator.clipboard.writeText(this.worldId).catch(() => {
        this.tooltip.text = 'コピーに失敗しました'
      })
      this.tooltip.text = 'コピーしました'
      this.showTooltip()
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
    async onSubmit(e) {
      this.error = false
      const recruit = Number(e.target.characterSelect.value)
      const res = await this.$recruit({ recruit }).catch(
        (e) => (this.error = true)
      )
      this.worldId = res.worldId
      const payload = {
        id: res.worldId,
        token: res.token,
        role: res.role,
      }
      this.$store.commit('world/update', payload)
    },
  },
}
