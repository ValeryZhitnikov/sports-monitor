"use client";

import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { AuthSchema } from "@/src/app/lib/schemas/auth";

import { Container } from "@/src/app/components/layout/Container";

type AuthFormInput = z.infer<typeof AuthSchema>;
export const AuthForm = () => {
	const ctx = useForm<AuthFormInput>({
		resolver: zodResolver(AuthSchema),
		defaultValues: {
			name: "",
			email: "",
		},
	});

	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
	} = ctx;

	const submitHandler = async (body: AuthFormInput) => {
		try {
			const res = await fetch("/api/auth", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(body),
			});

			if (!res.ok) {
				throw new Error("Request failed");
			}

			const data = await res.json();
			console.log("Response data:", data.payload);
		} catch (e) {
			console.error("Request failed:", e);
		}
	};

	return (
		<Container>
			<form onSubmit={handleSubmit(submitHandler)}>
				<FormProvider {...ctx}>
					<input type="text" {...register("name")} placeholder="Имя" />
					<input type="email" {...register("email")} placeholder="Email" />
					<button type="submit" disabled={isSubmitting}>
						{isSubmitting ? "Отправка..." : "Отправить"}
					</button>
				</FormProvider>
			</form>
		</Container>
	);
};
