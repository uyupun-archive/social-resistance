import Button from '~/components/button/index.vue'

export default {
  components: {
    Button,
  },
  layout: 'menu/index',
  data() {
    return {
      user: {
        id: '',
        icon: '',
        rate: 0,
        history: '',
      },
    }
  },
  mounted() {
    this.getUserInfo()
  },
  methods: {
    getUserInfo() {
      // TODO: ユーザー情報の取得
      this.user.id = 'ABCDEF'
      this.user.icon = 'http://placehold.it/200'
      this.user.rate = 1200
      this.user.history = '10勝5敗(50%)'
    },
    getRateIcon() {
      // TODO: レート数に応じたアイコン(画像)を返す
      return 'http://placehold.it/100'
    },
  },
}
