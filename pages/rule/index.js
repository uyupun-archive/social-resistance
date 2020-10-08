import Button from '~/components/button/index.vue'

export default {
  components: {
    Button,
  },
  data() {
    return {
      rules: [],
      rule: {
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
    initRules() {
      this.$fetchRules().then((rules) => {
        this.rules = rules
        this.setRule(this.rule.idx)
      })
    },
    setRule(idx) {
      const rule = this.rules[idx]
      this.rule.text = rule.text
      this.rule.image = `${process.env.MITSU_URL}${rule.image}`
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
