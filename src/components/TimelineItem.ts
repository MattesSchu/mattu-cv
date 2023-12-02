export enum Category {
    WERDEGANG,
    AUSBILDUNG,
    ENGAGEMENT,
    SPRACHE,
}

export interface GeneralItem {
    uuid: string;
}

export interface TimelineItemSub extends GeneralItem {
    title: string;
    subtitle: string;
    text?: string;
    split: boolean;
}

/**
 *  @field {string} uuid 
 *  @field {string} title 
 *  @field {Category} category 
 *  @field {string} location 
 *  @field {string} text 
 *  @field {Date} start 
 *  @field {Date?} end
 *  @field {string} image
 *  @field {TimelineItemSub[]} subitems 
 */
export interface TimelineItem extends GeneralItem {
    title: string;
    subtitle?: string;
    category: Category;
    location: string;
    text: string;
    showDates: boolean;
    start: Date;
    showEnd: boolean;
    untilToday: boolean;
    end?: Date;
    image?: string;
    subitems: TimelineItemSub[];
}
