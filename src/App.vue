<script setup lang="ts">
import TheCvContent from "@/components/content/TheCvContent.vue";
import TheCvViewer from "@/components/viewer/TheCvViewer.vue";
// Stores
import { useSettingsStore } from "@/stores/settings";
// Other
import { onMounted, onUnmounted, ref } from "vue";

const settings = useSettingsStore();

const showViewer = ref(true);

function handleKeydown(e: KeyboardEvent): void {
    // TODO: add more sophisticated shortcuts
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
    <nav>
        <button @click="showViewer = !showViewer">Toggle</button>
    </nav>
    <main>
        <TheCvContent class="appContent" />
        <TheCvViewer class="appViewer" />
    </main>
</template>
<style scoped>
main {
    width: 100%;
    height: 100%;
    display: grid;

    justify-items: stretch;
    grid-template-columns: 1fr  1fr;
}

nav {
    display: none;
    visibility: hidden;
}

@media only screen and (max-width: 420mm) {
    nav {
        display: block;
        visibility: visible;
        position: fixed;
        right: 10px;
        top: 10px;
        z-index: 1;
    }

    main {
        display: inline;
    }
    .appContent {
        display: v-bind("showViewer ? 'none' : 'inline'");
        visibility: v-bind("showViewer ? 'invisible' : 'visible'");
    }

    .appViewer {
        display: v-bind("showViewer ? 'block' : 'none'");
        visibility: v-bind("showViewer ? 'visible' : 'invisible'");
        width: 210mm;
    }
}

@media print {
    .appContent {
        display: none;
        visibility: hidden;
    }
}
</style>
