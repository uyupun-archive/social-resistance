import Button from '~/components/button/index.vue'

export default {
  components: {
    Button,
  },
  layout: 'menu/index',
  data() {
    return {
      rules: [],
      rule: {
        len: 0,
        idx: 0,
        text: '',
        image: null,
        isFirst: true,
        isLast: false,
      },
    }
  },
  mounted() {
    this.initRules()
  },
  methods: {
    async initRules() {
      const rules = await this.$fetchRules()
      this.rule.len = rules.length
      this.rules = rules
      this.setRule(this.rule.idx)
    },
    setRule(idx) {
      const rule = this.rules[idx]
      this.rule.text = rule.text
      this.rule.image = `${process.env.API_URL}${rule.image}`
      this.rule.isFirst = this.rule.idx === 0
      this.rule.isLast = this.rules.length === this.rule.idx + 1
    },
    nextRule() {
      this.setRule(++this.rule.idx)
    },
    prevRule() {
      this.setRule(--this.rule.idx)
    },
  },
}
