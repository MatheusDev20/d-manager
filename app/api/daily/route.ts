import { getByCalendarDay, getDailyByInterval } from "@/app/data";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const byDay = url.searchParams.get("byDay") as string;
  const start = url.searchParams.get("start") as string;
  const end = url.searchParams.get("end") as string;

  if (start && end && !byDay) {
    const dailys = await getDailyByInterval({ start, end });
    const response = {
      status: dailys ? 200 : 404,
      message: "Dailys fetched successfully",
      data: dailys,
    };

    return new Response(JSON.stringify(response), {
      status: 200,
    });
  }

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
