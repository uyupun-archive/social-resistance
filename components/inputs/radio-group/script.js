import RadioButton from '~/components/inputs/radio-button/index.vue'

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
