import Button from '~/components/button/index.vue'
import rules from '~/assets/json/rules.json'

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
    this.rules = rules
    this.setRule(this.ruleIndex)
  },
  methods: {
    setRule(idx) {
      const rule = this.rules[idx]
      this.showText = rule.text
      this.showImage = require(`~/assets/images/rules/rule_${idx + 1}.png`)
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
