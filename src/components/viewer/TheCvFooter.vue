<script setup lang="ts">
// Core
import { DIMENSIONS, in_mm } from "@/components/cvDimensions";
// Stores
import { useContentStore } from "@/stores/content";
import { useSettingsStore } from "@/stores/settings";

interface Props {
    page: number;
}

const props = defineProps<Props>();
const content = useContentStore();
const settings = useSettingsStore();
</script>
<template>
    <div class="cvFooter cvMainFooterText">
        <div class="cvFooterContact">
            <span :style="{ color: settings.color }">&#x2012;</span> {{ content.personalInformation.name }}
            <span :style="{ color: settings.color }">&#x2012;</span> {{ content.personalInformation.address }}
            <span :style="{ color: settings.color }">&#x2012;</span> {{ content.personalInformation.postal }}
            <span :style="{ color: settings.color }">&#x2012;</span> <br />
            <span :style="{ color: settings.color }">&#x2012;</span> {{ content.personalInformation.phone }}
            <span :style="{ color: settings.color }">&#x2012;</span> {{ content.personalInformation.mail }}
            <span :style="{ color: settings.color }">&#x2012;</span>
        </div>
        <div class="cvFooterPagination">Seite {{ props.page }} von 2</div>
    </div>
</template>
<style scoped lang="scss">
.cvFooter {
    position: absolute;
    width: v-bind("in_mm(DIMENSIONS.a4width_mm)");
    top: v-bind(
        "in_mm(props.page * DIMENSIONS.a4height_mm - DIMENSIONS.a4footerHeight_mm - DIMENSIONS.a4padding_b_mm)"
    );
}

.cvFooterContact {
    text-align: center;
}

.cvFooterPagination {
    position: absolute;
    bottom: 0px;
    right: 25px;
}
</style>
