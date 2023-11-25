<script setup lang="ts">
import { DIMENSIONS, in_mm } from "@/components/cvDimensions";
import { useSettingsStore } from "@/stores/settings";

const settings = useSettingsStore();

interface Props {
    posX: number;
    posY: number;
}
const props = defineProps<Props>();

</script>
<template>
    <div class="vLine"></div>
</template>
<style scoped lang="scss">
.vLine {
    position: absolute;
    left: v-bind("in_mm(props.posX)");
    top: v-bind("in_mm(props.posY)");
    height: v-bind("in_mm((DIMENSIONS.a4height_mm * 2) - props.posY)");

    border: v-bind("in_mm(DIMENSIONS.timelineBorder_mm)") dotted;
    border-top-width: 0px;
    border-bottom-width: 0px;
    border-right-width: 0px;
    border-color: v-bind("settings.color");
    transform: translateX(v-bind("in_mm(-DIMENSIONS.timelineBorder_mm/2)"));
}
</style>
