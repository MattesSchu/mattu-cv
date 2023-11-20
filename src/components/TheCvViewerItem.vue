<script setup lang="ts">
import type { TimelineItem } from './TimelineItem';
import { DIMENSIONS, in_mm } from './cvDimensions';
import TheCvViewerSectionHeading from "./TheCvContentSectionHeading.vue";
import { mdiSchoolOutline } from '@mdi/js';

interface Props {
    item: TimelineItem;
}

const props = defineProps<Props>();
</script>
<template>
    <div class="cvViewerItem">
        <div class="cvViewerItemTime">
        </div>
        <div class="cvViewerItemContent">
            <div>
                <div class="cvViewerItemStart">{{ props.item.start }}</div>
                <div class="cvViewerItemEnd">{{ props.item.end }}</div>
                <div class="cvViewerItemLocation">{{ props.item.location }}</div>
                <div class="cvViewerItemImage"><img :src="props.item.image" width="40"/></div>
            </div>
            <div>
                <div class="cvViewerItemTitle">{{ props.item.title }}</div>
                <div class="cvViewerItemText">{{ props.item.text }}</div>
                <div class="cvViewerItemSubtitle"></div>
            </div>
        </div>
    </div>
</template>
<style scoped lang="scss">
.cvViewerItemContent {
    display: grid;
    grid-template-columns: v-bind("in_mm(DIMENSIONS.timelinePosition_x_mm + DIMENSIONS.timelineMargin)") 1fr;
    padding-right: v-bind("in_mm(DIMENSIONS.a4padding_r_mm)");
}
</style>