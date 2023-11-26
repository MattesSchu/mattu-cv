<script setup lang="ts">
// Core
import { type TimelineItemSub } from "@/components/TimelineItem";
// Elements
import MyIcon from "@/elements/MyIcon.vue";
// Store
import { useContentStore } from "@/stores/content";
// Other
import { mdiCircleSlice8 } from "@mdi/js";

interface Props {
    item: TimelineItemSub;
}
const props = defineProps<Props>();
const content = useContentStore();
</script>
<template>
    <MyIcon class="cvTimelineIcon" :path="mdiCircleSlice8" color="black" :width="15" :height="15" />
    <!-- TOOD: make dashes Work -->
    <!-- <span class="cvViewerItemSubDashes">- -</span> -->
    <div
        :class="{ cvViewerItemSubTitel: !props.item.split, cvViewerItemSubTitelSplit: props.item.split }"
        class="cvMainBullitTitle"
    >
        {{ props.item.title }}
    </div>
    <div
        v-if="props.item.text"
        :class="{ cvViewerItemSubText: !props.item.split, cvViewerItemSubTextSplit: props.item.split }"
        class="cvMainSectionText"
    >
        {{ props.item.text }}
    </div>
</template>
<style scoped lang="scss">
.cvTimelineIcon {
    width: 100%;
    grid-column-start: timeline;
    // TODO: bullit at the top?
    justify-content: start;
    align-self: start;
    z-index: 1;
}
// TODO: Dashes
// .cvViewerItemSubDashes {
// }
.cvViewerItemSubTitel {
    grid-column-start: r1;
    grid-column-end: span end;
}

.cvViewerItemSubTitelSplit {
    grid-column-start: r1;
}
.cvViewerItemSubText {
    grid-column-start: r1;
    grid-column-end: span end;
}

.cvViewerItemSubTextSplit {
    grid-column-start: r2;
}
</style>
