import { list } from "@/src/data";

export async function GET(request: Request) {
  const url = new URL(request.url);

  const taskStatus = url.searchParams.get("taskStatus") as
    | "Pending"
    | "Completed"
    | undefined;

  const data = await list({ bringTasks: true, taskStatus });

  return new Response(JSON.stringify(data), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });
}
