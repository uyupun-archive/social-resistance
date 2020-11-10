import Button from '~/components/button/index.vue'

export default {
  components: {
    Button,
  },
  layout: 'menu/index',
  data() {
    return {
      logo: `${process.env.MITSU_URL}/images/logo/logo_white.svg`,
    }
  },
}
