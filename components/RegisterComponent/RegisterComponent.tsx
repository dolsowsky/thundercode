import { useRouter } from 'next/router'
import React from 'react'
import { useForm } from 'react-hook-form'

import Logo from '../Logo/Logo'
import s from './RegisterComponent.module.scss'

interface Inputs {
	username: string
	password: string
}

const RegisterComponent = () => {
	const router = useRouter()

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<Inputs>()

	const onSubmit = handleSubmit(async (data) => {
		const response = await fetch('/api/auth/register', {
			method: 'POST',
			body: JSON.stringify(data),
		})
		const result = await response.json()
		if (result.isSuccess) {
			router.push('/auth')
		} else {
			alert('This username is already exist')
		}
	})

	return (
		<>
			<Logo />
			<div className={s.Container}>
				<form onSubmit={onSubmit} className={s.Content}>
					<h1 className={s.Heading}>Register</h1>
					<div className="flex flex-col space-y-2">
						<div className="flex flex-col">
							<span className="font-light text-slate-700">Username or e-mail</span>
							<input {...register('username', { required: true })} className={s.Input} placeholder="Login" />
							{errors.username && <span className="text-red-700">This field is required</span>}
						</div>

						<div className="flex flex-col">
							<span className="font-light text-slate-700">Password</span>
							<input
								{...register('password', { required: true })}
								className={s.Input}
								type="password"
								placeholder="Password"
							/>
							{errors.password && <span className="text-red-700">This field is required</span>}
						</div>
					</div>

					<div className={s.Actions}>
						<a href="/auth" className={s.Link}>
							Already have account?
						</a>
						<button type="submit" className={s.AuthButton}>
							Register
						</button>
					</div>
				</form>
			</div>
		</>
	)
}
export default RegisterComponent
