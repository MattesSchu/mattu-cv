import { STORE_VERSION } from "./storer";

export function deserializeState(value: string): Record<string, any> {
    const [version, stateString] = value.split(/:(.*)/s);
    
    // Convert strings back to Date objects
    let state = JSON.parse(stateString, (key, value) => {
        if (typeof value === "string" && /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z$/.test(value)) {
            return new Date(value);
        }
        return value;
    });
    if (version !== STORE_VERSION) {
        // TODO: on major store change fill this
        console.log("DEFINE THE CHANGE FOR OLD VERSIONS HERE");
    } 
    return state;
}
