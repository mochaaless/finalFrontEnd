import { FunctionalComponent } from "preact/src/index.d.ts";
import { FavIds } from "../types.ts";


function addFavHandler(id: string) {

    const s = Object.fromEntries(document.cookie.split("; ").map(e => e.split("=")));
    if (s.favIds) {
        const favData = JSON.parse(s.favIds)
        const favIds: string[] = favData["favIds"]
        if (!favIds.includes(id)) {

            const newFavIds = favIds
            newFavIds.push(id)

            document.cookie = `favIds=${(JSON.stringify({
                favIds: newFavIds
            }))}; Path=/`
        
        } else {
            const newFavIds = favIds.filter(e => e !== id) 

            document.cookie = `favIds=${(JSON.stringify({
                favIds: newFavIds
            }))}; Path=/`
        }

    } else {
        document.cookie = `favIds=${(JSON.stringify({
            favIds: [id]
        }))}; Path=/`
    }

    window.location.reload()
}
        

type Data = {
    id: string,
    favIds: FavIds
}


const Page: FunctionalComponent<Data> = (props) => {
    return (
        <span 
            className={props.favIds.includes(props.id) ? "star fav" : "star"}
            onClick={() => addFavHandler(props.id)}
        >★</span>
    )
}

export default Page