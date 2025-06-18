import { FavIds } from "./types.ts";


export function getFavIds(req: Request): FavIds {
    const headers = req.headers
    const cookies = headers.get("Cookie")?.split(";")
    const cookie = cookies?.find(c => c.trim().startsWith("favIds="))

    let favIds: FavIds = []
    if (cookie) {
        const favs = cookie.split("=")[1]
        const favsParsed = JSON.parse(favs)
        favIds = favsParsed["favIds"]
    } else {
        console.log("No cookies found!")
    }

    return favIds
}