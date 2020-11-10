import Button from '~/components/button/index.vue'
import ModalWithButtons from '~/components/modal-with-buttons/index.vue'

export default {
  components: {
    ModalWithButtons,
    Button,
  },
  data() {
    return {
      showMenu: false,
      menu: [
        {
          name: 'タイトル',
          path: '/',
        },
        {
          name: 'プロフィール',
          path: '/profile',
        },
        {
          name: 'スキン',
          path: '/character-select',
        },
        {
          name: 'ランキング',
          path: '/ranking',
        },
        {
          name: 'あそびかた',
          path: '/rule',
        },
        {
          name: 'ログアウト',
          path: '',
        },
      ],
    }
  },
  methods: {
    onClickMenu() {
      this.showMenu = !this.showMenu
    },
    onClickMenuItem(path) {
      if (path && this.$route.path !== path) {
        this.showMenu = false
        this.$router.push(path)
      }
      if (!path) {
        this.$refs.logoutModal.open()
      }
    },
    checkDisabled(path) {
      return this.$route.path === path
    },
    logout() {
      sessionStorage.removeItem('token')
      this.closeModal()
      this.showMenu = false
      this.$router.push('/login')
    },
    closeModal() {
      this.$refs.logoutModal.close()
    },
  },
}
