import Button from '~/components/button/index.vue'

export default {
  components: {
    Button,
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
    }
  },
  mounted() {
    this.getUserInfo()
  },
  methods: {
    getUserInfo() {
      // TODO: ユーザー情報の取得
      this.user.id = 'ABCDEF'
      this.user.icon = 0
      this.user.rate = 1200
      this.user.history = '10勝5敗(50%)'
    },
    getRateIcon() {
      // TODO: レート数に応じたアイコン(画像)を返す
      return 'http://placehold.it/100'
    },
  },
}
