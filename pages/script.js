import Button from '~/components/inputs/button/index.vue'

export default {
  components: {
    Button,
  },
  layout({ store }) {
    return store.state.auth.token ? 'after-login/index' : 'default'
  },
  data() {
    return {
      logo: `${process.env.API_URL}/images/logo/logo_white.svg`,
    }
  },
}
