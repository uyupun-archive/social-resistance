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
    pages: {
      type: Array,
      required: true,
    },
  },
  methods: {
    onClickNumber(i) {
      this.$emit('search', i)
    },
    prev() {
      if (this.page !== 1) this.$emit('search', this.page - 1)
    },
    next() {
      const pages = Math.ceil(this.total / this.limit)
      if (this.page !== pages) this.$emit('search', this.page + 1)
    },
    toFront() {
      if (this.page !== 1) this.$emit('search', 1)
    },
    toBack() {
      const pages = Math.ceil(this.total / this.limit)
      if (this.page !== pages) this.$emit('search', pages)
    },
  },
}
