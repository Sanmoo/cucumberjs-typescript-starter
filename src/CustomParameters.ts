export interface CustomParameters {
    headless: boolean;
    manualTesterUsername: string;
    [p: string]: string | number | boolean;
}

export const defaults: Partial<CustomParameters> = {
    headless: true
};