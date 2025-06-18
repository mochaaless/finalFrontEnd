import { FreshContext, Handlers, PageProps } from "$fresh/server.ts";
import Axios from "npm:axios"
import { Character, FavIds } from "../../types.ts";
import FavButton from "../../islands/favButton.tsx"
import { getFavIds } from "../../utils.ts";

type Data = {
    character: Character
    favIds: FavIds
}

export const handler: Handlers = {
    GET: async (req: Request, ctx: FreshContext<unknown, Data>) => {
        try {
            const id = ctx.params.id
            const response = await Axios.get("https://hp-api.onrender.com/api/character/" + id)
            const data = response.data[0]

            const favIds = getFavIds(req)

            return ctx.render({ character: data, favIds })

        } catch (_e) {
            return new Response("API Error", {
                status: 500
            })
        }
    }
}


const Page = (props: PageProps<Data>) => {
    const character = props.data.character
    return (
        <div className="detail">
            <img src={character.image} alt={character.name} />
            <h2>
                {character.name}
                <FavButton id={character.id} favIds={props.data.favIds}/>
            </h2>
            <p>Casa: {character.house}</p>
            <p>{character.alive ? "Vivo" : "Muerto"}</p>
            <a href="/">Volver</a>
        </div>
    )
}

export default Page