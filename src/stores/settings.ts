import { defineStore } from "pinia";
import { ref } from "vue";

export const useSettingsStore = defineStore(
    "settings",
    () => {
        const color = ref("orange");
        const vLinePositionX_mm = ref(20);

        return {
            color,
            vLinePositionX_mm,
        };
    },
    { persist: true },
);
