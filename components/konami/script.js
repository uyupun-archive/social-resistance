export default {
  data() {
    return {
      keyInput: '',
    }
  },
  mounted() {
    this.konamiCommand()
  },
  methods: {
    konamiCommand() {
      document.addEventListener('keydown', (event) => {
        if (event.key === 'ArrowUp') {
          this.keyInput += '上'
        } else if (event.key === 'ArrowDown') {
          this.keyInput += '下'
        } else if (event.key === 'ArrowLeft') {
          this.keyInput += '左'
        } else if (event.key === 'ArrowRight') {
          this.keyInput += '右'
        } else if (event.key === 'A') {
          this.keyInput += 'A'
        } else if (event.key === 'B') {
          this.keyInput += 'B'
        } else if (event.key !== 'Shift') {
          this.keyInput = ''
        }
        if (this.keyInput.length > 10) {
          this.keyInput = this.commands.slice(1)
        }
        if (this.keyInput === '上上下下左右左右BA') {
          this.changeBackgroundColor()
        }
      })
    },
    changeBackgroundColor() {
      document.getElementsByTagName('body')[0].style.backgroundColor = 'red'
    },
  },
}
