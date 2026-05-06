import { AuthSchema } from "@/src/app/lib/schemas/auth";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest): Promise<NextResponse> {
	try {
		const body = await req.json();

		const result = AuthSchema.safeParse(body);

		if (!result.success) {
			return NextResponse.json({ error: result.error.issues[0].message }, { status: 400 });
		}

		const { email, name } = result.data;

		const payload = {
			email: email,
			name: name,
		};

		return NextResponse.json({ ok: true, payload });
	} catch (e) {
		console.error("Request failed:", e);
		return NextResponse.json({ error: "Request failed" }, { status: 500 });
	}
}
