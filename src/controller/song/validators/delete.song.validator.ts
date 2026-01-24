import vine from "@vinejs/vine";
import { authorizationGlobalVine } from "./utils/authorization.global.js";

export function deleteSongValidator() {
    return vine.object({
        songParamId: vine.
            string()
            .trim()
            .optional().requiredIfAnyMissing(['songBodyIds']),
        songBodyIds: vine
            .array(vine.object({
                songId: vine
                    .string()
                    .trim()
            }))
            .optional().requiredIfAnyMissing(['songParamId']),
        authorization: authorizationGlobalVine
    });
}