/* eslint-disable @typescript-eslint/no-explicit-any */
import { createUser, findByMail } from "@/src/data";
import { failed, ok } from "@/src/lib/api-response";

export async function GET(request: Request) {
  const url = new URL(request.url);

  const userEmail = url.searchParams.get("email") as string;

  const data = await findByMail(userEmail);

  return new Response(JSON.stringify(data), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });
}

export async function POST(request: Request) {
  try {
    const data = await request.json();
    if (!data.name || !data.email || !data.password)
      return failed("Missing required fields", 400);

    const user = await createUser(data);
    return ok(user);
  } catch (err: any) {
    console.error(err);
    return failed("Error creating user", 500);
  }
}
