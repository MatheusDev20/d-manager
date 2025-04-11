import { HomeCalendar } from "./components/home-calendar";

export type StartNewDaily = {
  day: string;
  begin: Date | null;
  isPastDate: boolean;
};

export default async function Home() {
  return <HomeCalendar />;
}
