<template>
  <div>
    <main>
      <transition name="page">
        <Nuxt />
      </transition>
    </main>
  </div>
</template>

<style lang="scss">
.page-enter {
  opacity: 0;

  &-active {
    transition: opacity 1.5s;
  }
}

html {
  font-size: 10px;
}

body {
  padding: 0;
  border: none;
  margin: 0;
  color: $white;
  background: $black;
  font-size: 1.4rem;
  box-sizing: border-box;
  font-family: 'Sawarabi-Gothic', sans-serif;
  opacity: 1;
  animation: fadeIn 1.5s forwards;
}

@keyframes fadeIn {
  to {
    opacity: 1;
  }
  from {
    opacity: 0;
  }
}
</style>
