import { findByMail } from "@/src/data";
import { failed, ok } from "@/src/lib/api-response";

export async function POST(request: Request) {
  const body = await request.json();
  const { email } = body;

  const user = await findByMail(email);

  if (!user) return failed("User not found", 404);
  const { password: hashedPassword } = user;
  console.log("Try to log pass", hashedPassword);

  return ok({ data: "User found" }, "User found", 200);
}
