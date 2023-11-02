"use client"
import React from 'react'
import * as XLSX from 'xlsx'
import { v4 as uuid } from 'uuid'
import { URL } from '@/util/consts';
import { useUser } from '@/util/hooks/useUser';
function convertToJSON(file: File, token: string) {
    if (file) {
        const reader = new FileReader();
        console.log(file.size)
        reader.onload = function (event) {
        if (!event.target) return alert('Ocorreu um erro')
        //@ts-ignore
        const data = new Uint8Array(event.target.result);
        console.log(data)
        const workbook = XLSX.read(data, { type: "array" });
  
        const jsonArrays: string[] = [];
  
        // Itera sobre cada planilha no arquivo
        workbook.SheetNames.forEach((sheetName) => {
          const worksheet = workbook.Sheets[sheetName];
          const jsonData = XLSX.utils.sheet_to_json(worksheet, { raw: false });
  
          // Adicionando a detecção de coluna
          const jsonWithColumnDetection = jsonData.map((row: any) => {
            const rowWithColumnDetection = {} as { value: string, columnIndex: number | bigint } | any;
            for (const column in row) {
              const columnIndex = XLSX.utils.decode_col(column);
              rowWithColumnDetection[column] = {
                value: row[column],
                columnIndex: columnIndex,
                id: uuid()
              };
            }
            return rowWithColumnDetection;
          }) as any;
  
          jsonArrays.push(jsonWithColumnDetection);
        });
        fetch(URL+"horario/edit", {
          method: "POST",
          body: JSON.stringify(jsonArrays),
          headers: { "Content-Type": "application/json", Authorization: token }
        })
          .then((res) => {
            if (res.status >= 400) {
              return res.json().then((errorData) => {
                throw new Error(`Erro ${res.status}: ${errorData.message}`);
              });
            } else {
              return res.json();
            }
          })
          .then((data) => {
            alert("Enviado com sucesso!")
          })
          .catch((err) => alert(err.message)) ;  
}
    reader.readAsArrayBuffer(file);
  }
}
function FileUploader() {
    const { email,isErrored,name,role,token } = useUser()
    return ( 
        <div className="flex items-center justify-center w-full mt-8">
            <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <svg className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
                    </svg>
                    <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Clique para fazer o upload</span></p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Envie apenas arquivos EXCEL - <span className=' font-bold text-md'>XLSX</span></p>
                </div>
                <input onChange={({ target }) => {
                    if (!target.files) return
                    convertToJSON(target.files[0], token)
                }} accept={'.xlsx'} id="dropzone-file" type="file" className="hidden" />
            </label>
        </div> 
    )
}
export default function page({}: {}) {
    return (
        <>
            <FileUploader />
        </>
    )
}