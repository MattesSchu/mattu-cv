import { defineStore } from "pinia";
import { ref } from "vue";

export const useSettingsStore = defineStore(
    "settings",
    () => {
        const color = ref("orange");

        return {
            color,
        };
    },
    { persist: true },
);
