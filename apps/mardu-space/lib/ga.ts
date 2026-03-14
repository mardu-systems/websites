const MEASUREMENT_ID = process.env.NEXT_PUBLIC_GOOGLE_MEASUREMENT_ID;
let initialized = false;

let reactGA: typeof import("react-ga4").default | null = null;
let loadPromise: Promise<typeof import("react-ga4").default> | null = null;

async function getReactGA() {
    if (reactGA) return reactGA;
    loadPromise = loadPromise ?? import("react-ga4").then((m) => m.default);
    reactGA = await loadPromise;
    return reactGA;
}

export async function initializeGA() {
    if (!MEASUREMENT_ID) {
        console.warn("GOOGLE_MEASUREMENT_ID is not set; analytics disabled");
        return;
    }

    if (!initialized) {
        const ga = await getReactGA();
        ga.initialize(MEASUREMENT_ID);
        initialized = true;
    }
}

export function pageview(path: string) {
    if (!initialized || !reactGA) return;
    reactGA.send({hitType: "pageview", page: path});
}

export function event(action: string, params?: Record<string, unknown>) {
    if (!initialized || !reactGA) return;
    reactGA.event(action, params);
}

export function resetGA() {
    initialized = false;
}
