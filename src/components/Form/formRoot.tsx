"use client"
import { useSearchParams } from 'next/navigation'
import { Children, Role, SetState } from '@/util/types'
import React, { useState, useEffect } from 'react'
import { FormMode } from './formMode'
import { Glory } from 'next/font/google'
import { FormSelect } from './FormSelect'
import { useForm, Controller, SubmitHandler, FieldValues } from 'react-hook-form'
import { z } from 'zod'
import axios from 'axios'
import { LOCAL_STORAGE, URL } from '@/util/consts'
import { setLocalStorage } from '@/LocalStorage'
import { signIn, useSession, SessionContextValue } from 'next-auth/react'
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
    const { data: session } = useSession()
    const [step, setStep] = useState<1 | 2>(1)
    const { control: control1, handleSubmit: handleSubmit1, formState: { errors: errors1 }, setError: setError1, watch, setValue } = useForm<RegisterStep1Data>()
    const { control: control2, handleSubmit: handleSubmit2, formState: { errors: errors2 } } = useForm<RegisterStep2Data>()
    useEffect(() => {
      if (session && session.user) {
        const { email, name } = session.user
        if (!email || !name) return
        setValue('email', email)
        setValue('name', name)
      } 
    }, [session])
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
        const _data = watch()
        const formData = {..._data, ...data, role}
        fetchData(formData, mode)
      }
    return (
        <>
        <FormMode mode={mode} setMode={setMode}/>
        {step === 1 ? 
        <form onSubmit={handleSubmit1(onSubmitStep1)} className='grid gap-1 mt-4'>
        <div>
          <Controller
            name="email"
            control={control1}
            render={({ field }) => <input className={inputClasses} placeholder='Email' {...field} />}
          />
          <span className=' text-sm text-red-500'>{errors1.email?.message}</span>
        </div>

        <div>
          <Controller
            name="name"
            control={control1}
            render={({ field }) => <input className={inputClasses} placeholder='Nome' {...field} />}
          />
          <span className=' text-sm text-red-500'>{errors1.name?.message}</span>
        </div>

        <div>
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
        {
          !session &&
          <button onClick={() => signIn()} className=' text-center w-full mt-3'>Entrar com google</button>
        }
        {/* <pre style={{}}>{JSON.stringify(session, null, 2)}</pre> */}
        </>
    )
}
type Mode = 'LOGIN' | 'REGISTER'
export function FormRoot() {
    const search = useSearchParams()
    const urlMode = search.get('mode')?.toUpperCase() === 'REGISTER' || search.get('mode')?.toUpperCase() === 'LOGIN' ? search.get('mode')?.toUpperCase() : null as Mode | null 
    //@ts-ignore
    const [mode, setMode] = useState<Mode>(urlMode ?? 'REGISTER')
    console.log(urlMode, mode)
    const [role, setRole] = useState<Role>(null) // type Role = "Professor" | "Direção" | null
    const { control, handleSubmit, formState: { errors }, setError } = useForm<loginSchemaData>()
    const onSubmitForm: SubmitHandler<loginSchemaData> = (data) => {
      fetchData(data, mode)
    }
    const { data: session } = useSession()
    if (session && session.user && mode === 'LOGIN') {
      axios.post(URL+'admin/google', {
        email: session.user.email,
      }).then(res => {
        window.location.pathname = '/'+res.data.role+'/home'
      }).catch(err => console.log(err))
      return (
        <div className='flex flex-col gap-4 justify-center items-center'>
        <h2>Sincronizando sua conta google...</h2>
        <div role="status" className=' scale-150'>
        <svg aria-hidden="true" className="w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
        </svg>
        <span className="sr-only">Loading...</span>
        </div>
      </div>
      )
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
          <button onClick={() => signIn()} className=' text-center w-full mt-3'>Entrar com google</button>
        </>
        }
        </>
    )
}