import { FunctionalComponent } from "preact/src/index.d.ts";
import { Character, FavIds } from "../types.ts";
import FavButton from "./favButton.tsx"

type Data = {
    characters: Character[]
    favIds: FavIds
}


const Page: FunctionalComponent<Data> = (props) => {
    return (
        <div className="grid">
            {props.characters.map((character: Character) => (
              <div className="card">
                <a href={`/characters/${character.id}`}>
                  <img src={character.image} alt={character.name} />
                </a>
                <div className="card-info">
                  <div>{character.name}</div>
                  <FavButton id={character.id} favIds={props.favIds}/>
                </div>
              </div>
            ))}
        </div>
    )
}

export default Page