import Compass from '~/components/compass/index.vue'

export default {
  components: {
    Compass,
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
    isCompass: {
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
