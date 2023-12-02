export const STORE_VERSION = "v1";

export function serializeState(state: Record<string, any>): string {
    // Convert Date objects to strings
    let stringToStore = JSON.stringify(state, (key, value) => {
        if (value instanceof Date) {
            return value.toISOString();
        }
        return value;
    });
    stringToStore = `${STORE_VERSION}:${stringToStore}`;
    return stringToStore;
}
