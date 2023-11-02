"use client"
import { Tempo } from '@/util/entities/tempo'
import { ReturnDayByISO } from '@/util/func/daysFunc';
import { AiFillCaretLeft, AiFillCaretRight } from 'react-icons/ai'
import getMateriaImg from '@/util/func/getMateriaImg';
import { Children } from '@/util/types';
import React, { useCallback, useReducer, useRef, useState } from 'react'
function Horario({ Horario, Materia, Prof, Sala, index, id }: _Horario) {
    const [active, setActive] = useState(true);
    const ref = useRef(null);
    return (
      <div className="flex flex-col z-50 w-64 animate-in slide-in-from-left fade-in duration-1000">
        <div
          onClick={() => setActive(!active)}
          ref={ref}
          className=" bg-dark-blue flex justify-around rounded-2xl p-2 items-center text-white"
        >
          <img src={getMateriaImg(Materia)} alt={Materia} className=" w-20 object-cover h-20" />
          <h3 className=" text-2xl">{Materia}</h3>
        </div>
        <div
          className={` bg-opacity-20 bg-blue-800 ${
            !active && "horario"
          } flex transition-all justify-between rounded-2xl relative ${
            active ? "bottom-6" : "bottom-24 shadow-2xl"
          } -z-10 text-white p-6 pt-10`}
          // style={{ marginBottom: !active && !isIndex ? "-70px" : "0px" }}
        >
          <div className="flex flex-col w-full items-center">
            <div className=" flex gap-2 text-main-text">
              <p className=' text-sm'>{`Professor (a): `}</p>
              <span className=" text-secondary text-sm">{Prof ? Prof : "Nenhum"}</span>
            </div>
            <div className=" flex gap-2 text-main-text">
              <p className=' text-sm'>{Horario}</p>
              <span className=' text-sm'>| {Sala ? Sala : "Convivência"}</span>
            </div>
          </div>
        </div>
      </div>
    );
  }


type _Horario = {
    Materia: string;
    Prof: string | null;
    Sala: number | null | string;
    Horario: string;
    index: number;
    id: string
  };
  
  const Rotina = ({ horariosData,sampleDay }: { sampleDay: string, horariosData: Tempo[][] }) => {
    return (
      <>
        <HorariosContainer>
          {horariosData.length > 0 &&
          ReturnDayByISO(sampleDay) - 1 !== -1 &&
          ReturnDayByISO(sampleDay) !== 6 ? (
            <>
              {horariosData[ReturnDayByISO(sampleDay) - 1].map(
                (item: Tempo | null, index) => (
                  <>
                    {item ? (
                      <>
                        {item.tempo.isBreak ? (
                          <>
                          </>
                        ) : (
                          <Horario
                            id={item.id}
                            index={index}
                            Horario={item.tempo.horario}
                            //  @ts-ignore
                            Sala={item.tempo.sala}
                            Materia={item.tempo.materia}
                            //  @ts-ignore
                            Prof={item.tempo.professor}
                            key={item.tempo.horario}
                          />
                        )}
                      </>
                    ) : (
                      <></>
                    )}
                  </>
                )
              )}
            </>
          ) : (
            <div className=" w-full items-center gap-6 flex flex-col text-center">
              <h1 className=" text-3xl font-bold">Hoje não há aula!</h1>
              <h3>Aproveite o seu dia! {":)"}</h3>
              {/* <img src="/free_il.png" /> */}
            </div>
          )}
          {horariosData.length === 0 && <h1>Carregando...</h1>}
        </HorariosContainer>
      </>
    );
  };
  
  function HorariosContainer({ children }: Children) {
    return (
      <div className="flex flex-col w-full px-2 rounded-2xl py-6 -z-20">
        {children}
      </div>
    );
  }
  const diasDaSemana = [
    "Domingo",
    "Segunda-feira",
    "Terça-feira",
    "Quarta-feira",
    "Quinta-feira",
    "Sexta-feira",
    "Sábado"
  ];
type indexes = {start: number, end: number}
export function Horarios({ data }: { data: Tempo[][][] }) {
    const [num,setNum] = useState<'1' | '2' | '3'>('1')
    const [indexes, setIndexes] = useState<indexes>({ end: 4, start: 0 })
    const [day, setDay] = useState(new Date().toISOString())
    const changeDay = useCallback((num: 1 | -1) => {
      console.log(num)
      setDay((prevState) => {
        const date = new Date(prevState)
        date.setDate(new Date(prevState).getDate() + num)
        return date.toISOString()
      })
    }, [])
    return (
      <>
        <div className=' flex items-center mt-4 gap-4 justify-center relative'>
          <select className=' text-black absolute left-8 top-4 text-2xl' onChange={(e) => {
            setIndexes(JSON.parse(e.currentTarget.value))
          }}>
            <option value={JSON.stringify({ end: 4, start: 0 })}>1° Ano</option>
            <option value={JSON.stringify({ end: 8, start: 4 })}>2° Ano</option>
            <option value={JSON.stringify({ end: 12, start: 8 })}>3° Ano</option>
          </select>
        <button className=' cursor-pointer' onClick={() => changeDay(-1)}>
          <AiFillCaretLeft size={32} />
        </button>
        <h1 className=' text-center w-64'>{diasDaSemana[ReturnDayByISO(day)]}</h1>
        <button className=' cursor-pointer' onClick={() => changeDay(1)}>
          <AiFillCaretRight size={32} />
        </button>
        </div>
        <div className=' flex flex-wrap w-full'>
            {data.slice(indexes.start,indexes.end).map(horario => (
              <div key={JSON.stringify(horario)} className="mt-2">
                <h1 className=" text-center text-3xl">{horario[0][0].turma}</h1>
                <Rotina horariosData={horario} sampleDay={day} />
            </div>
            ))}
        </div>
      </>
    )
}