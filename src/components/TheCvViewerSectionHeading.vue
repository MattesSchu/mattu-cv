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
    padding: 10px;
    position: absolute;
    left: v-bind("imageLeft");
    transform: translateX(-50%);
    border-radius: 50%;
    background-color: var(--vt-c-black-soft);
}

.cvViewerSectionHeaderTitle {
    position: relative;
    left: v-bind("in_mm(DIMENSIONS.timelinePosition_x_mm + DIMENSIONS.timelineMargin)");
    font-size: var(--font-size-h2);
}
</style>