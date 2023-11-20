<script setup lang="ts">
import { useContentStore } from "@/stores/content";
import { DIMENSIONS } from "@/components/cvDimensions";

interface Props {
    page: number;
}

const props = defineProps<Props>();
const content = useContentStore();

const width = "" + DIMENSIONS.a4width_mm + "mm";
const posY = "" + (props.page * (DIMENSIONS.a4height_mm - DIMENSIONS.a4footerHeight_mm)) + "mm";
</script>
<template>
    <div class="cvFooter">
        <div class="cvFooterContact">
            - {{ content.name }} - {{ content.address }} - {{ content.postal }} - <br />
            - {{ content.phone }} - {{ content.mail }} -
        </div>
        <div class="cvFooterPagination">Seite {{ props.page }} von 2</div>
    </div>
</template>
<style scoped lang="scss">
.cvFooter {
    position: absolute;
    width: v-bind(width);
    top: v-bind(posY);
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
