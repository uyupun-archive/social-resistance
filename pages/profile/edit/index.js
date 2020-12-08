import Button from '~/components/button/index.vue'
import TextBox from '~/components/text-box/index.vue'
import Modal from '~/components/modal/index.vue'

export default {
  components: {
    Button,
    TextBox,
    Modal,
  },
  layout: 'after-login/index',
  data() {
    return {
      user: {
        id: '',
        icon: 0,
        rate: 0,
        history: '',
      },
      newUserId: '',
      newUserIcon: 0,
      userIcons: [
        {
          name: 'チンピラウサギ_1',
          url: 'http://placehold.it/200',
        },
        {
          name: 'チンピラウサギ_2',
          url: 'http://placehold.it/200/ff0000/ffffff',
        },
        {
          name: 'チンピラウサギ_3',
          url: 'http://placehold.it/200/00ff00/ffffff',
        },
        {
          name: 'チンピラウサギ_4',
          url: 'http://placehold.it/200/0000ff/ffffff',
        },
      ],
      currentUserIcon: 0,
      showModal: false,
    }
  },
  mounted() {
    this.getUserInfo()
  },
  methods: {
    getUserInfo() {
      // TODO: ユーザー情報の取得
      this.user.id = this.newUserId = 'ABCDEF'
      this.user.icon = this.newUserIcon = this.currentUserIcon = 0
      this.user.rate = 1200
      this.user.history = '10勝5敗(50%)'
    },
    getRateIcon() {
      // TODO: レート数に応じたアイコン(画像)を返す
      return 'http://placehold.it/100'
    },
    onClick() {
      this.$refs.userIconModal.open()
    },
    onChange(e) {
      this.newUserId = e.target.value
    },
    checkDisabled() {
      return (
        this.user.id === this.newUserId && this.user.icon === this.newUserIcon
      )
    },
    selectIcon() {
      this.newUserIcon = this.currentUserIcon
      this.$refs.userIconModal.close()
    },
    prev() {
      if (this.currentUserIcon === 0) {
        this.currentUserIcon = this.userIcons.length - 1
      } else {
        this.currentUserIcon -= 1
      }
    },
    next() {
      if (this.currentUserIcon === this.userIcons.length - 1) {
        this.currentUserIcon = 0
      } else {
        this.currentUserIcon += 1
      }
    },
    onSubmit(e) {
      // TODO: API通信
      console.log(e.target.userId.value, this.newUserIcon)
    },
  },
}
