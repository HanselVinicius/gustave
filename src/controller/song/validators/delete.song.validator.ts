import vine from "@vinejs/vine";

export function deleteSongValidator() {
    return vine.object({
        songId: vine.
            string()
            .trim()
            .minLength(1),
        authorization: vine
            .string()
            .trim()
            .minLength(1)
    })
}