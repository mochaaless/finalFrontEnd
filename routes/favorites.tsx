import { FreshContext, Handlers, PageProps } from "$fresh/server.ts";
import Axios from "npm:axios"
import { Character, FavIds } from "../types.ts";
import CharacterList from "../islands/characterList.tsx"
import { getFavIds } from "../utils.ts";

type Data = {
    characters: Character[]
    favIds: FavIds
}

export const handler: Handlers = {
    GET: async (req: Request, ctx: FreshContext<unknown, Data>) => {
        try {

            const response = await Axios.get("https://hp-api.onrender.com/api/characters")
            const data = response.data
            
            const favIds = getFavIds(req)

            return ctx.render({ characters: data, favIds })

        } catch (_e) {
            return new Response("API Error", {
                status: 500
            })
        }
    }
}


const Page = (props: PageProps<Data>) => {

    const filteredCharacters = props.data.characters.filter(ch => props.data.favIds.includes(ch.id))
    return (
        <CharacterList characters={filteredCharacters} favIds={props.data.favIds}/>
    )
}

export default Page