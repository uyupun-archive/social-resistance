import SelectBox from '~/components/select-box/index.vue'
import Button from '~/components/button/index.vue'

export default {
  components: {
    SelectBox,
    Button,
  },
  data() {
    return {
      options: [
        {
          text: 'うさぎさん',
          value: '1',
        },
        {
          text: 'ばいきんくん',
          value: '2',
        },
      ],
      selected: '1',
    }
  },
  methods: {
    onSubmit(e) {
      console.log(e.target.characterSelect.value)
    },
  },
}
