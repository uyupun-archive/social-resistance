import SelectBox from '~/components/select-box/index.vue'
import Button from '~/components/button/index.vue'
import RadioGroup from '~/components/radio-group/index.vue'
import TextBoxIcon from '~/components/text-box-icon/index.vue'
import Tooltip from '~/components/tooltip/index.vue'
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
      successMsg: '',
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
    checkDisabled() {
      return !(this.worldId || this.successMsg)
    },
    initBeforeSubmit() {
      this.error = false
      this.worldId = ''
      this.successMsg = ''
    },
    validation(role, visibility) {
      if (![PLAYER_PEKORA, PLAYER_BAIKINKUN].includes(role)) return true
      if (!['public', 'private'].includes(visibility)) return true
      return false
    },
    async onSubmit(e) {
      this.initBeforeSubmit()
      const role = Number(e.target.role.value)
      const visibility = e.target.visibility.value
      if (this.validation(role, visibility)) {
        this.error = true
        return
      }

      const isPublic = visibility === 'public'
      const res = await this.$recruit({ role, isPublic }).catch(
        (e) => (this.error = true)
      )
      if (isPublic) this.successMsg = 'ワールドをこうかいしました！'
      else this.worldId = res.worldId
      const payload = {
        id: res.worldId,
        token: res.token,
        role: res.role,
      }
      this.$store.commit('world/update', payload)
    },
  },
}
