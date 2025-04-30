import { findByMail } from "@/app/data";
import { failed, ok } from "@/app/lib/api-response";

export async function POST(request: Request) {
  const body = await request.json();
  const { email } = body;

  const user = await findByMail(email);
  if (!user) return failed("User not found", 404);

  return ok({ data: "User found" }, "User found", 200);
}
