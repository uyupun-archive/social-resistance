import Button from '~/components/button/index.vue'

export default {
  components: {
    Button,
  },
  layout({ store }) {
    return store.state.auth.token ? 'menu/index' : 'default'
  },
  data() {
    return {
      logo: `${process.env.API_URL}/images/logo/logo_white.svg`,
    }
  },
}
