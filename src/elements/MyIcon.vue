<script setup lang="ts">
interface Props {
    path: string;
    width: number;
    height: number;
}

const props = defineProps<Props>();

function getViewBox():string {
    return `0 0 24 24`;
}

</script>
<template>
    <svg xmlns="http://www.w3.org/2000/svg"
        :viewBox="getViewBox()"
        :width="props.width"
        :height="props.height"
    >
        <path fill="white" :d="props.path"></path>
    </svg>
</template>
<style lang="scss" scoped></style>
