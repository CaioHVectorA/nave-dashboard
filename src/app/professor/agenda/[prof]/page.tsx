import { Horario } from "@/app/direcao/horario/Horario"
import { URL } from "@/util/consts"
import axios from "axios"
type ProfTempo = {
    value: string,
    horario: string,
    day: string,
    turma: string,
    id: string,
    sala: string
}

export default async function page({ params }: { params: { prof: string } }) {
    const data = (await axios(URL+'horario/prof/'+params.prof)).data as ProfTempo[]
    return (
        <>
            {data.map(({ day, horario, id, turma, value, sala }, index) => <Horario Horario={horario} Materia={value} Prof={params.prof} Sala={sala} id={id} index={index}/>)}
        </>
    )
}