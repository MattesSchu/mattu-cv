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
        <button class="btnFixed" @click="showViewer = !showViewer">Toggle</button>
    </nav>
    <main>
        <TheCvContent class="appContent" />
        <TheCvViewer class="appViewer" />
    </main>
</template>
<style scoped lang="scss">
main {
    width: 100vw;
    height: 100%;
    display: grid;

    justify-items: stretch;
    grid-template-columns: 1fr  1fr;
}

nav {
    display: none;
    visibility: hidden;
    width: 100%;
}

@media only screen and (max-width: 420mm) {
    nav {
        display: flex;
        visibility: visible;
        right: 10px;
        top: 10px;
        z-index: 1;
        justify-content: center;
        padding: 5px;
    }

    main {
        display: flex;
        overflow: scroll;
        justify-content: center;
    }
    .appContent {
        display: v-bind("showViewer ? 'none' : 'block'");
        visibility: v-bind("showViewer ? 'invisible' : 'visible'");
    }

    .appViewer {
        display: v-bind("showViewer ? 'block' : 'none'");
        visibility: v-bind("showViewer ? 'visible' : 'invisible'");
        overflow: scroll;
    }
}

@media print {
    .appContent {
        display: none;
        visibility: hidden;
    }
}
</style>
