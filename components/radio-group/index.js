import RadioButton from '~/components/radio-button/index.vue'

export default {
  props: {
    options: {
      type: Array,
      required: true,
    },
  },
  components: {
    RadioButton,
  },
}
