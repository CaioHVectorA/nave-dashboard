"use client"
import { Children, Role, SetState } from '@/util/types'
import React, { useState } from 'react'
import { FormMode } from './formMode'
import { Glory } from 'next/font/google'
import { FormSelect } from './FormSelect'
import { useForm, Controller, SubmitHandler, FieldValues } from 'react-hook-form'
import { z } from 'zod'
import axios from 'axios'
import { LOCAL_STORAGE, URL } from '@/util/consts'
import { setLocalStorage } from '@/LocalStorage'
const glory = Glory({ subsets: ['latin'] })
const inputClasses = 'bg-bg text-main-text mt-2 block w-full rounded-2xl py-2 px-2 text-black'
const registerSchemaStep1 = z.object({
    email: z.string().email("Insira um e-mail válido"),
    name: z.string(),
    password: z.string().min(6, "A senha deve ter pelo menos 6 caracteres"),
  });
  
  const registerSchemaStep2 = z.object({
    role: z.string(),
    acess_code: z.string(),
  });
  
  
  const loginSchema = z.object({
    email: z.string().email("Insira um e-mail válido"),
    password: z.string(),
  });

  type RegisterStep1Data = z.infer<typeof registerSchemaStep1>;
  type RegisterStep2Data = z.infer<typeof registerSchemaStep2>;
  type loginSchemaData = z.infer<typeof loginSchema>
  function fetchData(formData: any, mode: 'LOGIN' | 'REGISTER') {
    axios.post(URL+'admin/'+ (mode === 'LOGIN' ? '/login' : ''),formData).then(response => {
      setLocalStorage(LOCAL_STORAGE.USER_DATA,response.data)
      console.log(response.data.role)
      const url = response.data.role === 'Direção' ? '/direcao/home' : '/professor/home'
      window.location.pathname = url
    }).catch((err) => {
      alert((err.response.data.message || 'Ocorreu um erro. Cheque os campos e tente novamente.'))
      console.log(err)
    })
  }
function Register({
    mode,
    setMode,
    role,
    setRole,
  }: {
    mode: "LOGIN" | "REGISTER";
    setMode: SetState<"LOGIN" | "REGISTER">;
    role: Role;
    setRole: SetState<Role>;
  }) {
    const [step, setStep] = useState<1 | 2>(1)
    const { control: control1, handleSubmit: handleSubmit1, formState: { errors: errors1 }, setError: setError1, watch } = useForm<RegisterStep1Data>()
    const { control: control2, handleSubmit: handleSubmit2, formState: { errors: errors2 } } = useForm<RegisterStep2Data>()
    const onSubmitStep1: SubmitHandler<RegisterStep1Data> = (data) => {
        try {
          registerSchemaStep1.parse(data);
          console.log("Passo 1:", data);
          setStep(2);
        } catch (error) {
          if (error instanceof z.ZodError) {
            const validationErrors = {} as RegisterStep1Data;
            error.errors.forEach((err) => {
              const field = err.path[0]
              //@ts-ignore
              validationErrors[field] = { message: err.message };
            });
            //@ts-ignore
            Object.keys(validationErrors).forEach((field: "email" | "password" | "name") => {
                setError1(field, {
                    type: "manual",
                    //@ts-ignore
                  message: validationErrors[field].message,
                });
            })
          }
        }
      };
      const onSubmitStep2: SubmitHandler<RegisterStep2Data> = (data) => {
        console.log('yesye')
        const _data = watch()
        const formData = {..._data, ...data, role}
        fetchData(formData, mode)
      }
    return (
        <>
        <FormMode mode={mode} setMode={setMode}/>
        {/* <form className=' grid gap-1 mt-4'> */}
        {step === 1 ? 
        // <form onSubmit={handleSubmit1(onSubmitStep1)}  className=' grid gap-1 mt-4'>
        // <input className={inputClasses} placeholder='Email'/>
        // <input className={inputClasses} placeholder='Nome'/>
        // <input className={inputClasses} type='password' placeholder='Senha'/>
        // <button type='submit' className=' mt-4 bg-action-blue rounded-full py-2 px-1'>Próximo</button>
        // </form>
        <form onSubmit={handleSubmit1(onSubmitStep1)} className='grid gap-1 mt-4'>
        <div>
          {/* <label>Email</label> */}
          <Controller
            name="email"
            control={control1}
            render={({ field }) => <input className={inputClasses} placeholder='Email' {...field} />}
          />
          <span className=' text-sm text-red-500'>{errors1.email?.message}</span>
        </div>

        <div>
          {/* <label>Nome</label> */}
          <Controller
            name="name"
            control={control1}
            render={({ field }) => <input className={inputClasses} placeholder='Nome' {...field} />}
          />
          <span className=' text-sm text-red-500'>{errors1.name?.message}</span>
        </div>

        <div>
          {/* <label>Senha</label> */}
          <Controller
            name="password"
            control={control1}
            render={({ field }) => <input className={inputClasses} type='password' placeholder='Senha' {...field} />}
          />
          <span className=' text-sm text-red-500'>{errors1.password?.message}</span>
        </div>

        <button type='submit' className='mt-4 bg-action-blue rounded-full py-2 px-1'>Próximo</button>
      </form>
        : 
        <form onSubmit={handleSubmit2(onSubmitStep2)} className=' grid gap-1 mt-4'>
        <Controller 
        name='acess_code'
        control={control2}
        render={({ field }) => <input placeholder='Código' className=' bg-bg text-main-text mt-2 block mx-auto w-full rounded-full py-2 px-2 text-black' {...field} />}
        />
        <FormSelect label='Professor' role={role} setRole={setRole}/>
        <FormSelect label='Direção' role={role} setRole={setRole}/>
        <button className='mt-4 bg-action-blue rounded-full py-2 px-1' type='submit'>Registrar</button>
        </form>
        }
        {/* </form> */}
        </>
    )
}
export function FormRoot() {
    const [mode, setMode] = useState<'LOGIN' | 'REGISTER'>('REGISTER')
    const [role, setRole] = useState<Role>(null) // type Role = "Professor" | "Direção" | null
    const { control, handleSubmit, formState: { errors }, setError } = useForm<loginSchemaData>()
    const onSubmitForm: SubmitHandler<loginSchemaData> = (data) => {
      fetchData(data, mode)
    }
    return (
        <>
        {mode === 'REGISTER' ? 
            <Register mode={mode} setMode={setMode} role={role} setRole={setRole} />
        : 
        <>
        <FormMode mode={mode} setMode={setMode}/>
        <form className=' grid gap-1 mt-4' onSubmit={handleSubmit(onSubmitForm)}>
          <Controller 
          name='email'
          control={control}
          render={({ field }) => <input {...field} className={inputClasses} placeholder='Email'/>}
          />
          <Controller 
          name='password'
          control={control}
          render={({ field }) => <input {...field} className={inputClasses} type='password' placeholder='Senha'/>}
          />
          <button className='mt-4 bg-action-blue rounded-full py-2 px-1' type='submit'>Entrar</button> 
        </form>
        </>
        }
        </>
    )
}