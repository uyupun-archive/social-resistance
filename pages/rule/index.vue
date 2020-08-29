<template>
  <div class="container">
    <h3 class="title">あそびかた</h3>
    <div class="outer">
      <div class="text">
        <p>{{ showText }}</p>
        <img :src="showImage" alt="rule image" />
      </div>
      <div class="btns">
        <Button v-if="!isFirst" text="まえへ" @click.native="prevRule" />
        <Button
          v-if="isLast === false"
          text="つぎへ"
          @click.native="nextRule"
        />
      </div>
    </div>
    <div class="btn-back">
      <Button to="/" text="トップにもどる" />
    </div>
  </div>
</template>

<script>
import Button from '~/components/button/index.vue'
import rules from '~/assets/json/rule.json'

import rule1 from '~/assets/images/rules/rule1.png'
import rule2 from '~/assets/images/rules/rule2.png'
import rule3 from '~/assets/images/rules/rule3.png'
import rule4 from '~/assets/images/rules/rule4.png'
import rule5 from '~/assets/images/rules/rule5.png'
import rule6 from '~/assets/images/rules/rule6.png'
import rule7 from '~/assets/images/rules/rule7.png'
import rule8 from '~/assets/images/rules/rule8.png'

export default {
  components: {
    Button,
  },
  data() {
    return {
      ruleIndex: 0,
      showText: '',
      showImage: null,
      rules: [],
      isFirst: true,
      isLast: false,
    }
  },
  mounted() {
    this.rules = rules
    this.setRule(this.rules[this.ruleIndex])
  },
  methods: {
    setRule(rule) {
      this.showText = rule.text
      this.showImage = this.getImage(this.ruleIndex + 1)
      this.isFirst = this.ruleIndex === 0
      this.isLast = this.rules.length === this.ruleIndex + 1
    },
    nextRule() {
      this.setRule(this.rules[++this.ruleIndex])
    },
    prevRule() {
      this.setRule(this.rules[--this.ruleIndex])
    },
    getImage(imageNo) {
      switch (imageNo) {
        case 1: {
          return rule1
        }
        case 2: {
          return rule2
        }
        case 3: {
          return rule3
        }
        case 4: {
          return rule4
        }
        case 5: {
          return rule5
        }
        case 6: {
          return rule6
        }
        case 7: {
          return rule7
        }
        case 8: {
          return rule8
        }
        default: {
          return null
        }
      }
    },
  },
}
</script>

<style scoped lang="scss">
.container {
  text-align: center;
  padding: 50px 0 0;
}

.title {
  font-family: 'Roboto-Thin', sans-serif;
  font-size: 6rem;
  margin: 0;
}

.outer {
  margin: 40px auto;
  width: 1000px;
  background: $black;
  padding: 120px 40px 100px;
  border: 5px solid $white;
  box-sizing: border-box;

  & .text {
    margin: 0 0 40px;

    & .image {
      width: 100%;
    }
  }

  p {
    text-align: center;
    font-size: 3.6rem;
    margin: 0 0 40px;
  }

  .btns {
    display: flex;
    flex-wrap: nowrap;
    justify-content: space-around;
  }
}

.btn {
  &-back {
    margin: 0 0 20px;
  }
}
</style>
