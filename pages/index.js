import Button from '~/components/button/index.vue'

export default {
  components: {
    Button,
  },
  data() {
    return {
      logo: `${process.env.MITSU_URL}/images/logo/logo_white.svg`,
      token: sessionStorage.token,
    }
  },
}
