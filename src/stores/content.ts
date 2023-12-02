import { Category, type GeneralItem, type TimelineItem, type TimelineItemSub } from "@/components/TimelineItem";
import { deserializeState } from "@/storage/loader";
import { serializeState } from "@/storage/storer";
import { defineStore } from "pinia";
import { reactive } from "vue";
import { PLACEHOLDER_IMAGE } from "./placeholderImage";

interface ReactiveItems {
    data: TimelineItem[];
}

export interface PersonalInformation {
    name: string;
    profilePicture: string;
    address: string;
    postal: string;
    birthday: Date;
    birthplace: string;
    phone: string;
    mail: string;
    homepage: string;
    xing: string;
    family: string;
}

export function saveContent(): void {
    const content = useContentStore();
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(serializeState(content.$state));
    const downloadAnchorNode = document.createElement("a");
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", "contentState.json");
    document.body.appendChild(downloadAnchorNode);
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
}

export function loadContent(value: string): void {
    const content = useContentStore();
    const loadedState = deserializeState(value) as ContentState;
    content.$patch(loadedState);
}

interface ContentState {
    personalInformation: PersonalInformation;
    items: ReactiveItems;
    reset: () => void;
    getCategoryItems: (category: Category) => TimelineItem[];
    getItem: (uuid: string) => TimelineItem | undefined;
    getSubItem: (parentUuid: string, uuid: string) => TimelineItemSub | undefined;
    getItemIdx: (uuid: string) => number;
    deleteItem: (uuid: string) => void;
    deleteSubItem: (parentUuid: string, uuid: string) => void;
    moveItemUp: (uuid: string) => void;
    moveItemDown: (uuid: string) => void;
    moveSubItemUp: (parentUuid: string, uuid: string) => void;
    moveSubItemDown: (parentUuid: string, uuid: string) => void;
}

function initPersonalInformation(): PersonalInformation {
    return {
        name: "Vor- und Nachname",
        address: "Straße und Hausnummer",
        birthday: new Date(Date.now()),
        birthplace: "Ort",
        family: "Familienstand",
        homepage: "url",
        mail: "mail",
        phone: "+49 (0) ...",
        postal: "12345 Ort",
        profilePicture: PLACEHOLDER_IMAGE,
        xing: "url",
    };
}

export const useContentStore = defineStore(
    "content",
    (): ContentState => {
        const personalInformation = reactive<PersonalInformation>(initPersonalInformation());
        const items = reactive<ReactiveItems>({ data: [] });

        function reset(): void {
            Object.assign(personalInformation, initPersonalInformation());
            items.data = [];
        }

        function getCategoryItems(category: Category): TimelineItem[] {
            const res: TimelineItem[] = [];
            items.data.forEach((el) => {
                if (el.category === category) {
                    res.push(el);
                }
            });
            const sortedRes = [...res];
            return sortedRes.sort((l, r) => {
                return l.idx - r.idx;
            });
        }

        function getItem(uuid: string): TimelineItem | undefined {
            for (let i = 0; i < items.data.length; i++) {
                if (items.data[i].uuid === uuid) {
                    return items.data[i];
                }
            }
            return undefined;
        }

        function getSubItem(parentUuid: string, uuid: string): TimelineItemSub | undefined {
            const parent = getItem(parentUuid);
            if (!parent) {
                return undefined;
            }
            for (let i = 0; i < parent.subitems.length; i++) {
                if (parent.subitems[i].uuid === uuid) {
                    return parent.subitems[i];
                }
            }
            return undefined;
        }

        function getItemIdx(uuid: string): number {
            let idx = -1;
            for (let i = 0; i < items.data.length; i++) {
                if (items.data[i].uuid === uuid) {
                    idx = i;
                    break;
                }
            }
            return idx;
        }

        function deleteItem(uuid: string): void {
            let item = getItem(uuid);
            if (!item) {
                return;
            }
            const idx = getItemIdx(uuid);
            if (idx === -1) {
                return;
            }
            items.data.splice(idx, 1);

            const remainingCategoryItems = getCategoryItems(item.category);
            for (let i = 0; i < remainingCategoryItems.length; i++) {
                if (remainingCategoryItems[i].idx > item.idx) {
                    remainingCategoryItems[i].idx--;
                }
            }
        }

        function deleteSubItem(parentUuid: string, uuid: string): void {
            const item = getItem(parentUuid);
            if (!item) {
                return;
            }

            for (let i = 0; i < item.subitems.length; i++) {
                if (item.subitems[i].uuid === uuid) {
                    item.subitems.splice(i, 1);
                    return;
                }
            }
        }

        function moveItemUp(uuid: string): void {
            const item = getItem(uuid);
            if (!item) {
                console.error("Item could not be found.");
                return;
            }
            const categoryItems = getCategoryItems(item.category);
            if (item.idx === 0) {
                // Item at the beginning of bounds.
                return;
            }
            for (let i = 0; i < categoryItems.length; i++) {
                if (categoryItems[i].idx === item.idx - 1) {
                    categoryItems[i].idx++;
                    break;
                }
            }
            item.idx--;
        }

        function moveItemDown(uuid: string): void {
            const item = getItem(uuid);
            if (!item) {
                return;
            }
            const categoryItems = getCategoryItems(item.category);
            if (item.idx === categoryItems.length - 1) {
                // Item at the end of bounds.
                return;
            }
            for (let i = 0; i < categoryItems.length; i++) {
                if (categoryItems[i].idx === item.idx + 1) {
                    categoryItems[i].idx--;
                    break;
                }
            }
            item.idx++;
        }

        function moveSubItemUp(parentUuid: string, uuid: string): void {
            const item = getItem(parentUuid);
            if (!item) {
                return;
            }
            let idx = -1;
            for (let i = 0; i < item.subitems.length; i++) {
                if (item.subitems[i].uuid === uuid) {
                    idx = i;
                    break;
                }
            }
            if (idx === -1) {
                return;
            }
            let subitem = item.subitems[idx];
            item.subitems.splice(idx, 1);
            item.subitems.splice(idx - 1, 0, subitem);
        }

        function moveSubItemDown(parentUuid: string, uuid: string): void {
            const item = getItem(parentUuid);
            if (!item) {
                return;
            }
            let idx = -1;
            for (let i = 0; i < item.subitems.length; i++) {
                if (item.subitems[i].uuid === uuid) {
                    idx = i;
                    break;
                }
            }
            if (idx === -1) {
                return;
            }
            let subitem = item.subitems[idx];
            item.subitems.splice(idx, 1);
            item.subitems.splice(idx + 1, 0, subitem);
        }

        return {
            personalInformation,
            items,
            reset,
            getCategoryItems,
            getItem,
            getSubItem,
            deleteItem,
            deleteSubItem,
            getItemIdx,
            moveItemUp,
            moveItemDown,
            moveSubItemUp,
            moveSubItemDown,
        };
    },
    {
        persist: {
            serializer: {
                serialize: serializeState,
                deserialize: deserializeState,
            },
        },
    },
);
