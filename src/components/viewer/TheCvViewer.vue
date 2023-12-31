<script setup lang="ts">
import TheCvFooter from "./TheCvFooter.vue";
import TheCvViewerItem from "./TheCvViewerItem.vue";
import TheCvViewerSectionHeading from "./TheCvViewerSectionHeading.vue";
import TheCvViewerPersonal from "./TheCvViewerPersonal.vue";
import { getL1Width, getL3Width, bisWidth_mm } from "./viewerWidths";
// Elements
import VerticalLine from "@/elements/VerticalLine.vue";
import ProfilePicture from "@/elements/ProfilePicture.vue";
// Core
import { DIMENSIONS, in_mm } from "@/components/cvDimensions";
import { Category } from "@/components/TimelineItem";
// Stores
import { useContentStore } from "@/stores/content";
// Other
import { mdiCogOutline, mdiHeartOutline, mdiSchoolOutline, mdiTranslate } from "@mdi/js";

const content = useContentStore();
</script>
<template>
    <div class="cv">
        <TheCvFooter :page="1" />
        <TheCvFooter :page="2" />
        <VerticalLine :posX="DIMENSIONS.timelinePosition_x_mm" :posY="20" />
        <ProfilePicture />
        <div class="cvPage">
            <div class="cvPageContent">
                <div class="cvTitle">{{ content.personalInformation.name }}</div>
                <TheCvViewerPersonal />
                <TheCvViewerSectionHeading title="Werdegang" :path="mdiSchoolOutline" />
                <TheCvViewerItem
                    v-for="(item, idx) in content.getCategoryItems(Category.WERDEGANG)"
                    :key="idx"
                    :item="item"
                />
            </div>
        </div>
        <div class="cvPage">
            <div class="cvPageContent">
                <TheCvViewerSectionHeading title="Erfahrung" :path="mdiCogOutline" />
                <TheCvViewerItem
                    v-for="(item, idx) in content.getCategoryItems(Category.AUSBILDUNG)"
                    :key="idx"
                    :item="item"
                />
                <TheCvViewerSectionHeading title="Engagement" :path="mdiHeartOutline" />
                <TheCvViewerItem
                    v-for="(item, idx) in content.getCategoryItems(Category.ENGAGEMENT)"
                    :key="idx"
                    :item="item"
                />
                <TheCvViewerSectionHeading title="Sprachen" :path="mdiTranslate" />
                <TheCvViewerItem
                    v-for="(item, idx) in content.getCategoryItems(Category.SPRACHE)"
                    :key="idx"
                    :item="item"
                />
            </div>
        </div>
    </div>
</template>
<style scoped lang="scss">
.cv {
    width: 210mm;
    height: 100vh;
    position: relative;
    overflow: scroll;
}

.cvPage {
    height: 297mm;
    width: 210mm;
    border-radius: 10px;
    background-color: white;
}

.cvPageContent {
    display: grid;
    grid-template-columns:
        [l1] v-bind("in_mm(getL1Width())")
        [l2] v-bind("in_mm(bisWidth_mm)")
        [l3] v-bind("in_mm(getL3Width())")
        [timeline] v-bind("in_mm(DIMENSIONS.timelineMargin_mm*2)")
        [r1] v-bind("in_mm(DIMENSIONS.itemBullitWidth_mm)")
        [r2] 1fr;
    padding-top: v-bind("in_mm(DIMENSIONS.a4padding_t_mm)");
    padding-right: v-bind("in_mm(DIMENSIONS.a4padding_r_mm)");
    padding-left: v-bind("in_mm(DIMENSIONS.a4padding_l_mm)");
    row-gap: 1mm;
}

.cvTitle {
    line-height: 1;
    grid-column: 1 / -1;

    font-size: var(--font-size-h1);
    text-transform: uppercase;
    margin-top: -2mm;
}

@media print {
    @page {
        margin: 0mm;
    }

    body {
        background-color: white;
    }
    .page {
        margin: 0mm;
        background-color: white;
    }
    .cv {
        height: auto;
        overflow: visible;
    }

    .cvPage {
        border-radius: 0px;
    }

    * {
        print-color-adjust: exact !important;
        -webkit-print-color-adjust: exact !important;
    }
}
</style>
