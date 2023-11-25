<script setup lang="ts">
import { useContentStore } from "@/stores/content";
import { DIMENSIONS, in_mm } from "@/components/cvDimensions";
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
            <span :style="{ color: settings.color }">&#x2012;</span> {{ content.name }}
            <span :style="{ color: settings.color }">&#x2012;</span> {{ content.address }}
            <span :style="{ color: settings.color }">&#x2012;</span> {{ content.postal }}
            <span :style="{ color: settings.color }">&#x2012;</span> <br />
            <span :style="{ color: settings.color }">&#x2012;</span> {{ content.phone }}
            <span :style="{ color: settings.color }">&#x2012;</span> {{ content.mail }}
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
