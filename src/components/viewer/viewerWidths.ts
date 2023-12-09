import { DIMENSIONS } from "../cvDimensions";

export const bisWidth_mm = 3;

export function getLeftWidth(): number {
    return DIMENSIONS.timelinePosition_x_mm - DIMENSIONS.a4padding_l_mm - DIMENSIONS.timelineMargin_mm;
}

export function getL1Width(): number {
    let leftWidth = getLeftWidth();
    return (leftWidth - bisWidth_mm) / 2;
}

export function getL3Width(): number {
    let leftWidth = getLeftWidth();
    return (leftWidth - bisWidth_mm) / 2;
}