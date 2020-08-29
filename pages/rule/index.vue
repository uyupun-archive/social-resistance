<template>
  <div class="container">
    <h3 class="title">あそびかた</h3>
    <div class="outer">
      <div class="text">
        <p>{{ showText }}</p>
        <img :src="showImage" alt="説明画像" />
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

export default {
  components: {
    Button,
  },
  data() {
    return {
      ruleIndex: 0,
      showText: '',
      showImage: '',
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
      // this.showImage = rule.image
      this.isFirst = this.ruleIndex === 0
      this.isLast = this.rules.length === this.ruleIndex + 1
    },
    nextRule() {
      this.setRule(this.rules[++this.ruleIndex])
    },
    prevRule() {
      this.setRule(this.rules[--this.ruleIndex])
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
  width: 1200px;
  background: $black;
  padding: 120px 40px 100px;
  border: 5px solid $white;
  box-sizing: border-box;
  p {
    text-align: center;
    font-size: 3.6rem;
    margin: 0 0 40px;
  }
  img {
    width: 100%;
    margin-bottom: 40px;
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
