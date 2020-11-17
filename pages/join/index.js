import Button from '~/components/button/index.vue'

export default {
  components: {
    Button,
  },
  layout: 'menu/index',
  data() {
    return {
      logo: `${process.env.API_URL}/images/logo/logo_white.svg`,
    }
  },
}
