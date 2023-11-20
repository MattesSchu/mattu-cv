<script setup lang="ts">
import { useSettingsStore } from '@/stores/settings';

const settingsStore = useSettingsStore();
</script>
<template>
   <div class="settigs">
    <div class="colorPicher">
        <label for="favcolor">Select your favorite color:</label>
        <input type="color" id="favcolor" v-model="settingsStore.color">
    </div>
   </div> 
</template>
<style scoped lang="scss">
.settings {
    width: 20px;
    background-color: rgb(120, 120, 158);
}
</style>