import { Horario } from "@/app/direcao/horario/Horario"
import { URL } from "@/util/consts"
import { ProfTempo } from "@/util/types"
import axios from "axios"
import { ProfView } from "./view"

export default async function page({ params }: { params: { prof: string } }) {
    const data = (await axios(URL+'horario/prof/'+params.prof)).data as ProfTempo[]
    return (
        <main className="">
            <ProfView data={data} params={params}/>
        </main>
    )
}