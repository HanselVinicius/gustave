import vine from "@vinejs/vine";
import { authorizationGlobalVine } from "./utils/authorization.global.js";

export function listSongQueryValidator() {
    return vine.object({
        limit: vine.
            number()
            .min(1)
            .max(50),
        offset: vine.
            number()
            .min(0)
            .max(50),
        authorization: authorizationGlobalVine
    })

}