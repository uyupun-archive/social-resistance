import Sonar from '~/components/sonar/index.vue'

export default {
  components: {
    Sonar,
  },
  props: {
    to: {
      type: String,
      default: '',
    },
    text: {
      type: String,
      required: true,
    },
    size: {
      type: String, // 'small' | 'middle' | 'large'
      default: 'middle',
    },
    isSonar: {
      type: Boolean,
      default: false,
    },
    topLeft: {
      type: Boolean,
      default: false,
    },
    topRight: {
      type: Boolean,
      default: false,
    },
    bottomLeft: {
      type: Boolean,
      default: false,
    },
    bottomRight: {
      type: Boolean,
      default: false,
    },
  },
}
