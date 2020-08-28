<template>
  <div>
    <div class="container">
      <World ref="world" class="world" />
      <div class="turn-box">
        <div
          class="turn-which"
          :class="{
            'turn-active': pekora.active,
            'turn-inactive': !pekora.active,
          }"
        >
          <p class="turn-which-player">うさぎさんのターン</p>
          <p class="turn-which-word">
            [{{ pekora.baseWord ? pekora.baseWord.word : '' }}]
          </p>
        </div>
        <p class="turn-count">{{ turn.count }}</p>
        <div
          class="turn-which"
          :class="{
            'turn-active': baikinKun.active,
            'turn-inactive': !baikinKun.active,
          }"
        >
          <p class="turn-which-player">ばいきんくんのターン</p>
          <p class="turn-which-word">
            [{{ baikinKun.baseWord ? baikinKun.baseWord.word : '' }}]
          </p>
        </div>
      </div>
      <div class="word-wrapper">
        <div v-for="word in words" :key="word.index" class="word">
          <Button
            :text="word.word"
            :is-compass="true"
            :top-left="word.direction.top_left"
            :top-right="word.direction.top_right"
            :bottom-left="word.direction.bottom_left"
            :bottom-right="word.direction.bottom_right"
            @click.native="openWordModal(word)"
          />
        </div>
      </div>
      <Modal ref="wordModal">
        <template v-slot:content>
          <p>『{{ selectedWord.word }}』でよろしいですか？</p>
        </template>
        <template v-slot:btns>
          <Button text="よくない" @click.native="closeWordModal" />
          <Button text="よい" @click.native="turnProcess(selectedWord)" />
        </template>
      </Modal>
    </div>
    <div class="btn-pause">
      <Button text="ポーズ" :is-small="true" @click.native="openPauseModal" />
    </div>
    <Modal ref="pauseModal" :is-wrap="true">
      <template v-slot:content>
        <p>ポーズ</p>
      </template>
      <template v-slot:btns>
        <div class="pause-choices">
          <Button text="さいかい" @click.native="closePauseModal" />
        </div>
        <div class="pause-choices">
          <Button text="やりなおし" />
        </div>
        <div class="pause-choices">
          <Button text="やめる" to="/" :not-link-style="true" />
        </div>
      </template>
    </Modal>
    <TurnAnimation
      ref="turnAnimation"
      :count="turn.count"
      pekora="うさぎさん"
      baikin-kun="ばいきんくん"
    />
    <Modal ref="winModal" :show-always="true">
      <template v-slot:content>
        <p>『{{ winner }}』のかち！</p>
      </template>
      <template v-slot:btns>
        <Button to="/" text="おつかれ" />
      </template>
    </Modal>
  </div>
</template>

<script>
import Button from '~/components/button/index.vue'
import World from '~/components/world/index.vue'
import Modal from '~/components/modal/index.vue'
import Turn from '~/components/turn/index.js'
import TurnAnimation from '~/components/turn-animation/index.vue'

export default {
  middleware: 'redirectToTop',
  components: {
    Button,
    World,
    Modal,
    TurnAnimation,
  },
  data() {
    return {
      pekora: {
        active: true,
        baseWord: null,
      },
      baikinKun: {
        active: false,
        baseWord: null,
      },
      words: null,
      selectedWord: '',
      winner: '',
      turn: new Turn(),
    }
  },
  mounted() {
    this.getFirstWord()
    this.getWords()
    this.showTurnAnimation()
  },
  methods: {
    getFirstWord() {
      this.pekora.baseWord = this.$getFirstWord()
      this.baikinKun.baseWord = this.$getFirstWord()
    },
    getWords() {
      this.$nextTick(() => {
        this.words = this.$getWords(
          this.isPekoraTurn() ? this.pekora.baseWord : this.baikinKun.baseWord
        )
      })
    },
    updateBaseWord(word) {
      if (this.isPekoraTurn()) this.pekora.baseWord = word
      else this.baikinKun.baseWord = word
    },
    openWordModal(word) {
      this.selectedWord = word
      this.$refs.wordModal.open()
    },
    closeWordModal() {
      this.$refs.wordModal.close()
    },
    openPauseModal() {
      this.$refs.pauseModal.open()
    },
    closePauseModal() {
      this.$refs.pauseModal.close()
    },
    turnProcess(word) {
      this.closeWordModal()
      this.movePlayer(word)
      if (this.$refs.world.isGoal()) {
        this.winner = 'うさぎさん'
        this.$refs.winModal.open()
        return
      }
      if (this.$refs.world.isHit()) {
        this.winner = 'ばいきんくん'
        this.$refs.winModal.open()
        return
      }
      this.updateBaseWord(word)
      this.turn.add()
      this.setActiveTurn()
      this.getWords()
      this.showTurnAnimation()
    },
    movePlayer(word) {
      if (this.isPekoraTurn())
        this.$refs.world.movePekora(this.pekora.baseWord, word)
      else this.$refs.world.moveBaikinKun(this.baikinKun.baseWord, word)
    },
    setActiveTurn() {
      this.pekora.active = !this.pekora.active
      this.baikinKun.active = !this.baikinKun.active
    },
    showTurnAnimation() {
      this.$refs.turnAnimation.show()
    },
    isPekoraTurn() {
      return this.turn.count % 2 !== 0
    },
  },
}
</script>

<style scoped lang="scss">
.container {
  margin: 0 auto 50px;
  width: 1200px;
}

.world {
  margin: 10px auto;
}

.turn {
  &-box {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 0 0 10px;
  }

  &-count {
    font-size: 5rem;
    margin: 0;
  }

  &-which {
    display: inline-block;
    padding: 10px 10px;
    font-size: 2.5rem;
    text-align: center;
    border: 5px solid $gray;

    &-player {
      margin: 0;
    }

    &-word {
      margin: 0;
    }
  }

  &-inactive {
    color: $gray;
    border-color: $gray;
  }

  &-active {
    color: $white;
    border-color: $white;
  }
}

.word-wrapper {
  margin: 0 50px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
}

.word {
  margin: 0 20px 30px 20px;
  width: 20%;
}

.btn-pause {
  text-align: right;
  margin: 0 25px 20px;
}

.pause-choices {
  width: 100%;
  text-align: center;
  margin: 0 0 30px;

  &:last-of-type {
    margin: 0;
  }
}
</style>
