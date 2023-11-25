<script setup lang="ts">
import type { TimelineItem } from "@/components/TimelineItem";
import { DIMENSIONS, in_mm } from "@/components/cvDimensions";
import { mdiCircleSlice8 } from "@mdi/js";
import MyIcon from "@/elements/MyIcon.vue";
import TheCvViewerItemSub from "@/components/TheCvViewerItemSub.vue";
import type { Settings } from "http2";
import { useSettingsStore } from "@/stores/settings";

interface Props {
    item: TimelineItem;
}

const props = defineProps<Props>();
const settings = useSettingsStore();

function getMonthStr(date: Date): string {
    return date.toLocaleString("de-DE", { month: "long" });
}

</script>
<template>
    <div class="cvViewerItemStart">{{ props.item.start.getFullYear() }}<br><span class="cvViewerItemStartMonth">{{ getMonthStr(props.item.start) }}</span></div>
    <div class="cvViewerItemBis"><span :style="{ color: settings.color }">&#x2012;</span></div>
    <div class="cvViewerItemEnd">{{ props.item.end ? props.item.end.getFullYear() : "heute" }}<br><span class="cvViewerItemEndMonth">{{ props.item.end ? getMonthStr(props.item.end) : "" }}</span></div>
    <MyIcon class="cvTimelineIcon" :path="mdiCircleSlice8" :width="30" :height="30" color="black" />
    <div class="cvViewerItemTitleAndLocation">
        <span class="cvViewerItemTitle cvMainSectionSubtitle cvMainSectionSubtitle_01">{{ props.item.title }}</span>
        <span class="cvViewerItemLocation cvMainSectionSubtitle cvMainSectionSubtitle_02">&hairsp;/&hairsp;{{ props.item.location }}</span>
    </div>
    <div class="cvViewerItemImage"><img :src="props.item.image" width="40" /></div>
    <div class="cvViewerItemSubtitle" v-if="props.item.subtitle">{{ props.item.subtitle }}</div>
    <div v-if="props.item.text" class="cvViewerItemText cvMainSectionText">{{ props.item.text }}</div>
    <!-- TODO: subitem  -->
    <TheCvViewerItemSub v-for="(item, key) in props.item.subitems" :item="item" />
</template>
<style scoped lang="scss">
.cvViewerItemStart {
    align-self: center;
    text-align: center;
    grid-column-start: l1;
}

.cvViewerItemStartMonth {
    align-self: top;
    text-align: center;
    // TODO: general font
    font-size: 6pt;
    position: absolute;
    transform: translateX(-50%);
    line-height: .8;
}

.cvViewerItemBis {
    align-self: center;
    text-align: center;
}
.cvViewerItemEnd {
    align-self: center;
    text-align: center;
}

.cvViewerItemEndMonth {
    text-align: center;
    // TODO: general font
    font-size: 6pt;
    position: absolute;
    transform: translateX(-50%);
    line-height: .8;
}

.cvTimelineIcon {
    width: 100%;
    justify-content: center;
    align-self: center;
    z-index: 1;
}
.cvViewerItemLocation {
}
.cvViewerItemImage {
}
.cvViewerItemTitleAndLocation {
    grid-column: r1 / -1;
    align-self: center;
}

.cvViewerItemTitle {
}

.cvViewerItemLocation {
}
.cvViewerItemText {
    grid-column-start: r1;
    grid-column-end: span end;
}
.cvViewerItemSubtitle {
    grid-column-start: r1;
    grid-column-end: span end;
}
</style>
