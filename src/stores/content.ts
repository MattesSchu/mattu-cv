import { Category, type TimelineItem } from "@/components/TimelineItem";
import { defineStore } from "pinia";
import { reactive, ref } from "vue";
import { v4 as uuidv4 } from "uuid";

interface ReactiveItems {
    data: TimelineItem[];
}

export const useContentStore = defineStore(
    "content",
    () => {
        const name = ref("");
        const profilePicture = ref<string | null>(null);
        const address = ref("");
        const postal = ref("");
        const birthday = ref<Date>();
        const birthplace = ref("");
        const phone = ref("");
        const mail = ref("");
        const homepage = ref("");
        const xing = ref("");
        const family = ref("");
        const items = reactive<ReactiveItems>({ data: [] });

        function getItems(category: Category): TimelineItem[] {
            const res: TimelineItem[] = [];
            items.data.forEach((el) => {
                if (el.category === category) {
                    res.push(el);
                }
            });
            return res;
        }

        function getItem(uuid: string): TimelineItem | undefined {
            console.log("GET ITEM - UUID", uuid);
            for (let i = 0; i < items.data.length; i++) {
                console.log(items.data[i]);
                if (items.data[i].uuid === uuid) {
                    console.log("FOUND");
                    return items.data[i];
                }
            }
            return undefined;
        }

        function deleteItem(uuid: string): void {
            for (let i = 0; i < items.data.length; i++) {
                if (items.data[i].uuid === uuid) {
                    items.data.splice(i, 1);
                    return;
                }
            }
        }

        return {
            name,
            profilePicture,
            address,
            postal,
            birthday,
            birthplace,
            phone,
            mail,
            homepage,
            xing,
            family,
            items,
            getItems,
            getItem,
            deleteItem,
        };
    },
    { persist: true },
);
