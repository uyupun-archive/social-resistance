<template>
  <div>
    <main>
      <Nuxt />
    </main>
  </div>
</template>

<style lang="scss">
@font-face {
  font-family: 'Roboto-Thin';
  src: url('~assets/fonts/Roboto-Thin.ttf') format('truetype');
}

@font-face {
  font-family: 'Sawarabi Gothic';
  src: url('~assets/fonts/SawarabiGothic-Regular.ttf') format('truetype');
}

html {
  font-size: 10px;
}

body {
  padding: 0;
  border: none;
  margin: 0;
  color: #ffffff;
  background: #111111;
  font-size: 1.4rem;
  box-sizing: border-box;
  font-family: 'Sawarabi Gothic', sans-serif;
}
</style>
