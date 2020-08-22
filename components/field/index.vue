<template>
  <div class="field-bg">
    <canvas id="field" width="1000" height="500"></canvas>
  </div>
</template>

<script>
export default {
  data() {
    return {
      ctx: null,
    }
  },
  mounted() {
    this.createCanvas()
    this.drawRectangle()
  },
  methods: {
    createCanvas() {
      const field = document.getElementById('field')
      this.ctx = field.getContext('2d')
    },
    drawRectangle() {
      this.ctx.beginPath()
      this.ctx.rect(50, 50, 75, 50)
      this.ctx.fillStyle = 'rgba(255,0,0,0.8)'
      this.ctx.fill()
      this.ctx.strokeStyle = 'purple'
      this.ctx.lineWidth = 8
      this.ctx.stroke()
    },
  },
}
</script>

<style scoped lang="scss">
.field-bg {
  background: white;
  width: 1000px;
  height: 500px;
}
</style>
