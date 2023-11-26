<script setup lang="ts">
import { useSettingsStore } from "@/stores/settings";

const settingsStore = useSettingsStore();
</script>
<template>
    <div class="cvSettigs">
        <div class="colorPicher">
            <label for="favcolor">Select your favorite color:</label>
            <input type="color" id="favcolor" v-model="settingsStore.color" />
        </div>
        <!-- TODO: mas, add all DIMENSIONS -->
    </div>
</template>
<style scoped lang="scss">
.cvSettigs {
    width: 100%;
}

@media print {
    .cvSettigs {
        display: none;
        visibility: hidden;
    }
}
</style>
