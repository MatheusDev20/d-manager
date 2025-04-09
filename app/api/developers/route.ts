import { list } from "@/lib/db/developers";

export async function GET() {
  const data = await list({ bringTasks: true });

  return new Response(JSON.stringify(data), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });
}
