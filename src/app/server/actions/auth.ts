"use server";

export async function signin(formData: FormData) {
  // Add some kind of server validation with "Zod"
  const password = formData.get("password");
  const email = formData.get("email");

  console.log("Request", password, email);
}
