<template>
  <div class="container">
    <h3 class="title">あそびかた</h3>
    <div class="outer">
      <div class="text">
        <p>{{ showText }}</p>
        <img :src="showImage" alt="説明画像" />
      </div>
      <div class="btns">
        <Button text="まえへ" @click.native="prevRule" />
        <Button
          text="つぎへ"
          v-if="isLast === false"
          @click.native="nextRule"
        />
      </div>
    </div>
    <div class="btn-rule">
      <Button to="/" text="トップにもどる" />
    </div>
  </div>
</template>

<script>
import Button from '~/components/button/index.vue'

export default {
  components: {
    Button,
    // Modal,
  },
  data() {
    return {
      ruleIndex: null,
      showText: '',
      showImage: '',
      rules: [
        {
          text: 'うさぎさんサイドとばいきんくんサイドに分かれます。',
          image:
            'https://placehold.jp/800x450.png?text=%E3%83%AB%E3%83%BC%E3%83%AB1',
          isLast: false,
        },
        {
          text: 'うさぎさんはおうちに向かって移動していきます。',
          image:
            'https://placehold.jp/800x450.png?text=%E3%83%AB%E3%83%BC%E3%83%AB2',
          isLast: false,
        },
        {
          text: 'ばいきんくんはうさぎさんを捕まえる方向に移動していきます。',
          image:
            'https://placehold.jp/800x450.png?text=%E3%83%AB%E3%83%BC%E3%83%AB3',
          isLast: false,
        },
        {
          text:
            'それぞれの移動は画面の下に表示される言葉を選んでおこないます。',
          image:
            'https://placehold.jp/800x450.png?text=%E3%83%AB%E3%83%BC%E3%83%AB4',
          isLast: false,
        },
        {
          text:
            'その言葉を選ぶとどの方向に進んでいくかを、右側に出ている円の白い部分で知ることができます。',
          image:
            'https://placehold.jp/800x450.png?text=%E3%83%AB%E3%83%BC%E3%83%AB5',
          isLast: false,
        },
        {
          text: 'うさぎさんとばいきんくんで交互に移動していきます。',
          image:
            'https://placehold.jp/800x450.png?text=%E3%83%AB%E3%83%BC%E3%83%AB6',
          isLast: false,
        },
        {
          text: 'うさぎさんは距離を保ちつつおうちにたどり着ければ勝利です。',
          image:
            'https://placehold.jp/800x450.png?text=%E3%83%AB%E3%83%BC%E3%83%AB7',
          isLast: false,
        },
        {
          text:
            'うさぎさんとばいきんくん、お互いのソーシャルディスタンス(赤いエリア)が重なってしまうとばいきんくんの勝利です。',
          image:
            'https://placehold.jp/800x450.png?text=%E3%83%AB%E3%83%BC%E3%83%AB8',
          isLast: true,
        },
      ],
    }
  },
  mounted() {
    this.ruleIndex = 0
    this.setRule(this.rules[this.ruleIndex])
  },
  methods: {
    setRule(rule) {
      console.log(rule)
      this.showText = rule.text
      this.showImage = rule.image
      this.isLast = rule.isLast
    },
    nextRule() {
      this.setRule(this.rules[++this.ruleIndex])
    },
    prevRule() {
      if (--this.ruleIndex < 0) {
        this.$router.push('/')
      }
      this.setRule(this.rules[this.ruleIndex])
    },
  },
}
</script>

<style scoped lang="scss">
.container {
  text-align: center;
}
.title {
  font-family: 'Roboto-Thin', sans-serif;
  font-size: 6rem;
  line-height: 1;
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
</style>
