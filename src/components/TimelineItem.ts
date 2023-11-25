export enum Category {
    WERDEGANG,
    AUSBILDUNG,
    ENGAGEMENT,
}

export interface TimelineItemSub {
    uuid: string;
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
export interface TimelineItem {
    uuid: string;
    title: string;
    subtitle?: string;
    category: Category;
    location: string;
    text: string;
    start: Date;
    end?: Date;
    image?: string;
    subitems: TimelineItemSub[];
}
