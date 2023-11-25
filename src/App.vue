<script setup lang="ts">
import { onMounted, onUnmounted } from "vue";
import TheCvContent from "./components/TheCvContent.vue";
import TheCvViewer from "./components/TheCvViewer.vue";
import { useSettingsStore } from "./stores/settings";

const settings = useSettingsStore();

function handleKeydown(e: KeyboardEvent): void {
    if (e.ctrlKey && e.key === "k") {
        e.preventDefault(); // Prevent default browser action
        settings.printModeActive = !settings.printModeActive;
    }
}

onMounted(() => {
    window.addEventListener("keydown", handleKeydown);
});
onUnmounted(() => {
    window.removeEventListener("keydown", handleKeydown);
});
</script>
<template>
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
