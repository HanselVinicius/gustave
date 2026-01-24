import vine from "@vinejs/vine";

export const authorizationGlobalVine = vine
    .string()
    .trim()
    .minLength(1)