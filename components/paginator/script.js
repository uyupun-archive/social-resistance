export default {
  props: {
    page: {
      type: Number,
      required: true,
    },
    limit: {
      type: Number,
      required: true,
    },
    total: {
      type: Number,
      required: true,
    },
  },
  methods: {
    getPages() {
      if (this.total === 0) return [1]
      const showPages = []
      const pages = Math.ceil(this.total / this.limit)
      const values = this.getMinAndMaxValue(pages)
      for (let i = 0; i < 5; i++) {
        const num = values.min + i
        if (num <= values.max) showPages.push(num)
      }
      return showPages
    },
    getMinAndMaxValue(pages) {
      if (this.page <= 3) return { min: 1, max: pages <= 5 ? pages : 5 }
      if (pages < this.page + 2) {
        if (this.page <= 5) return { min: 1, max: pages }
        else
          return {
            min: pages === this.page ? this.page - 4 : this.page - 3,
            max: pages,
          }
      }
      return { min: this.page - 2, max: this.page + 2 }
    },
    onClickIndex(i) {
      this.$emit('search', i)
    },
    prev() {
      if (this.page !== 1) this.$emit('search', this.page - 1)
    },
    next() {
      const pages = Math.ceil(this.total / this.limit)
      if (this.page < pages && pages !== 0) this.$emit('search', this.page + 1)
    },
    toBegin() {
      if (this.page !== 1) this.$emit('search', 1)
    },
    toEnd() {
      const pages = Math.ceil(this.total / this.limit)
      if (this.page < pages && pages !== 0) this.$emit('search', pages)
    },
  },
}
