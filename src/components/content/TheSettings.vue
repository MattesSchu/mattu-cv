<script setup lang="ts">
import { useSettingsStore } from "@/stores/settings";

const settingsStore = useSettingsStore();
</script>
<template>
    <div class="cvContentItemEntry">
        <label for="favcolor">Hauptfarbe</label>
        <input type="color" id="favcolor" v-model="settingsStore.color" />
        <!-- TODO: mas, add all DIMENSIONS -->
    </div>
</template>
<style scoped lang="scss">
@import url("./style.scss");
</style>
