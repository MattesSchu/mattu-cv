<script setup lang="ts">
import { DIMENSIONS } from "@/components/cvDimensions";
import { useSettingsStore } from "@/stores/settings";

const settings = useSettingsStore();

interface Props {
    posX: number;
    posY: number;
}
const props = defineProps<Props>();

const posX = "" + props.posX + "mm";
const posY = "" + props.posY + "mm";
const height = "" + ((DIMENSIONS.a4height_mm * 2) - props.posY) + "mm";
</script>
<template>
    <div class="vLine"></div>
</template>
<style scoped lang="scss">
.vLine {
    position: absolute;
    left: v-bind(posX);
    top: v-bind(posY);
    height: v-bind(height);

    border: 3px dotted;
    border-top-width: 0px;
    border-bottom-width: 0px;
    border-right-width: 0px;
    border-color: v-bind("settings.color");
}
</style>
