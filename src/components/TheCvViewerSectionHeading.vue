<script setup lang="ts">
import MyIcon from '@/elements/MyIcon.vue';
import { DIMENSIONS, in_mm } from './cvDimensions';
interface Props {
    title: string;
    path: string;
}

const props = defineProps<Props>();
const imageWidth = 60;
const imageHeight = imageWidth;
const imageLeft = in_mm(DIMENSIONS.timelinePosition_x_mm);
</script>
<template>
    <div class="cvViewerSectionHeader">
        <MyIcon class="cvViewerSectionHeaderImage" :path="path" :width="imageWidth" :height="imageHeight"/>
        <div class="cvViewerSectionHeaderTitle">{{ props.title }}</div>
    </div>
</template>
<style scoped lang="scss">
.cvViewerSectionHeader {
    height: 80px;
}
.cvViewerSectionHeaderImage {
    position: absolute;
    padding: 10px;
    left: v-bind("imageLeft");
    transform: translateX(-50%);
    border-radius: 50%;
    background-color: var(--vt-c-black-soft);
}

.cvViewerSectionHeaderTitle {
    position: relative;
    width: v-bind("in_mm(DIMENSIONS.a4width_mm - DIMENSIONS.timelinePosition_x_mm - DIMENSIONS.timelineMargin_mm - DIMENSIONS.a4padding_r_mm)");
    left: v-bind("in_mm(DIMENSIONS.timelinePosition_x_mm + DIMENSIONS.timelineMargin_mm)");
    font-size: var(--font-size-h2);
    text-transform: uppercase;
}
</style>