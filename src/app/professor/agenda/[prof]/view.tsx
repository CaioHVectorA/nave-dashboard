"use client"
import { Horario } from "@/app/direcao/horario/Horario";
import { ProfTempo } from "@/util/types";
import { useState } from "react";

type Day = "SEGUNDA-FEIRA"|"TERÇA-FEIRA"|"QUARTA-FEIRA"|"QUINTA-FEIRA"|"SEXTA-FEIRA"
export function ProfView({ data, params }: { data: ProfTempo[], params: { prof: string } }) {
    const [_day, setDay] = useState<Day>('SEGUNDA-FEIRA')
    const filteredData = data.filter(tempo => tempo.day === _day)
    console.log(filteredData)
    return (
        <>
                <select onChange={(e) => setDay(e.target.value as Day)} value={_day}>
                {["SEGUNDA-FEIRA","TERÇA-FEIRA","QUARTA-FEIRA","QUINTA-FEIRA","SEXTA-FEIRA"].map(i => <option>{i}</option>)}
                </select>
                <div className=" flex flex-col my-4">
                {filteredData.map(({ day, horario, id, turma, value, sala }, index) => (
                    <div className=" flex gap-4 items-center">
                        <h2>{turma}</h2>
                        <Horario Horario={horario} Materia={value} Prof={params.prof} Sala={sala} id={id} index={index}/>
                    </div>
                ))}
                {filteredData.length === 0 && (
                    <>
                    <h1>Você não tem aulas hoje para dar. Aproveite seu dia!</h1>
                    <img src="/ilust.png" className=" w-5/12"/>
                    </>
                )
            }
                </div>
        </>
    )
}