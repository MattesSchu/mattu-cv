<script setup lang="ts">
import TheSettings from './components/TheSettings.vue'
import TheCvContent from './components/TheCvContent.vue'
import TheCvViewer from './components/TheCvViewer.vue'
</script>

<template>
  <header>
    <TheSettings />
  </header>

  <main>
    <TheCvContent />
    <TheCvViewer />
  </main>
</template>

<style scoped>
main {
  width: 100%;
  height: 100%;
  display: grid;

  justify-items: stretch;
  grid-template-columns: 1fr 1fr;
}
</style>
