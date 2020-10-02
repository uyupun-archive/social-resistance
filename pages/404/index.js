import Button from '~/components/button/index.vue'

export default {
  components: {
    Button,
  },
  data() {
    return {
      pekora: `${process.env.MITSU_URL}/images/objects/pekora.gif`,
      baikinKun1: `${process.env.MITSU_URL}/images/objects/baikinkun_1.gif`,
      baikinKun2: `${process.env.MITSU_URL}/images/objects/baikinkun_2.gif`,
    }
  },
}
