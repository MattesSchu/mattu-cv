<script setup lang="ts">
import type { TimelineItem } from './TimelineItem';
import { DIMENSIONS, in_mm } from './cvDimensions';
import TheCvViewerSectionHeading from "./TheCvContentSectionHeading.vue";
import { mdiSchoolOutline } from '@mdi/js';

interface Props {
    item: TimelineItem;
}

const props = defineProps<Props>();
console.log(props.item.end);


</script>
<template>
    <div class="cvViewerItem">
        <div class="cvViewerItemTime">
        </div>
        <div class="cvViewerItemContent">
            <div class="cvViewerItemStart">{{ props.item.start.getFullYear() }}</div>
            <div class="cvViewerItemBis">bis</div>
            <div class="cvViewerItemEnd">{{ props.item.end ? props.item.end.getFullYear() : "heute" }}</div>
            <div>BULLET</div>
            <div class="cvViewerItemTitleAndLocation">{{ props.item.title }} / {{ props.item.location }}</div>
            <div class="cvViewerItemImage"><img :src="props.item.image" width="40"/></div>
            <div class="cvViewerItemSubtitle">DER FEHLT NOCH</div>
            <div class="cvViewerItemText">{{ props.item.text }}</div>
        </div>
    </div>
</template>
<style scoped lang="scss">
//  | left | timeline | right1 | right2 |
//  |      |          |        |        |
.cvViewerItemContent {
    display: grid;
    grid-template-columns:  [l1] 15mm [l2] 10mm [l3] 15mm [timeline] 20mm [r1] 40mm [r2] 100mm;
    padding-right: v-bind("in_mm(DIMENSIONS.a4padding_r_mm)");
}

.cvViewerItemStart{

}
.cvViewerItemEnd{

}
.cvViewerItemLocation{

}
.cvViewerItemImage{

}
.cvViewerItemTitleAndLocation{
    grid-column-start: r1;
    grid-column-end: span end;
}
.cvViewerItemText{
    grid-column-start: r1;
    grid-column-end: span end;
}
.cvViewerItemSubtitle{
    grid-column-start: r1;
    grid-column-end: span end;
}
</style>