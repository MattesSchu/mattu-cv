<script setup lang="ts">
import { useContentStore } from "@/stores/content";
import { useSettingsStore } from "@/stores/settings";
import { DIMENSIONS } from "@/components/cvDimensions";

const content = useContentStore();
const settings = useSettingsStore();

const top = "" + DIMENSIONS.a4padding_t_mm + "mm";
const right = "" + DIMENSIONS.a4padding_t_mm + "mm";
</script>
<template>
    <img v-if="content.profilePicture" class="profilePicture" :src="content.profilePicture"/>
</template>
<style scoped lang="scss">
.profilePicture {
    position: absolute;
    right: v-bind("right");
    top: v-bind("top");
    
    border: 2px solid;
    color: v-bind("settings.color");
    width: 60mm;
}
</style>
