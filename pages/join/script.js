import Button from '~/components/inputs/button/index.vue'

export default {
  components: {
    Button,
  },
  layout: 'after-login/index',
  data() {
    return {
      logo: `${process.env.API_URL}/images/logo/logo_white.svg`,
    }
  },
}
