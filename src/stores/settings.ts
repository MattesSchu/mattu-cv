import { defineStore } from "pinia";
import { ref } from "vue";

export const useSettingsStore = defineStore(
    "settings",
    () => {
        const color = ref("orange");
        // TODO: move this to Dimension
        const vLinePositionX_mm = ref(20);
        const profilePictureWidth_mm = ref(60);
        const profilePictureBorder_mm = ref(1);
        const printModeActive = ref(false);

        return {
            color,
            vLinePositionX_mm,
            profilePictureWidth_mm,
            profilePictureBorder_mm,
            printModeActive,
        };
    },
    { persist: true },
);
