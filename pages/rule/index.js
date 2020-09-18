import Button from '~/components/button/index.vue'

export default {
  components: {
    Button,
  },
  data() {
    return {
      rules: [],
      ruleIndex: 0,
      showText: '',
      showImage: null,
      isFirst: true,
      isLast: false,
    }
  },
  mounted() {
    this.initRules()
  },
  methods: {
    initRules() {
      this.$fetchRules().then((rules) => {
        this.rules = rules
        this.setRule(this.ruleIndex)
      })
    },
    setRule(idx) {
      const rule = this.rules[idx]
      this.showText = rule.text
      this.showImage = process.env.MITSU_URL + rule.image
      this.isFirst = this.ruleIndex === 0
      this.isLast = this.rules.length === this.ruleIndex + 1
    },
    nextRule() {
      this.setRule(++this.ruleIndex)
    },
    prevRule() {
      this.setRule(--this.ruleIndex)
    },
  },
}
