import z from "zod";

export const AuthSchema = z.object({
	name: z.string().min(2, "Имя должно быть не менее 2 символов"),
	email: z.string().email("Неверный формат email"),
});
