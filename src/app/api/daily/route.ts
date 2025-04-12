import { getByCalendarDay } from "@/src/lib/db/daily";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const byDay = url.searchParams.get("byDay") as string;
  const daily = await getByCalendarDay(byDay);

  const response = {
    status: daily ? 200 : 404,
    message: "Daily fetched successfully",
    data: daily,
  };

  return new Response(JSON.stringify(response), {
    status: 200,
  });
}
