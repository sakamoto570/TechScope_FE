<template>
  <div class="header-wrapper">
    <h1>
      <slot />
    </h1>
  </div>
</template>

<style scoped>
.header-wrapper {
  background: linear-gradient(135deg, #1e3c72, #6fa8ff, #eef5ff);
  color: white;
  padding: 8px 16px;
}
h1 {
  margin: 0px;
}
</style>
