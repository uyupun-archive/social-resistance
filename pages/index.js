import Button from '~/components/button/index.vue'

export default {
  components: {
    Button,
  },
  data() {
    return {
      logo: `${process.env.API_HOST}/images/logo/logo_white.svg`,
    }
  },
}
