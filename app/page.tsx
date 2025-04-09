import { HomeCalendar } from "./components/home-calendar";

export type StartNewDaily = {
  day: Date | null;
  begin: Date | null;
  isPastDate: boolean;
};

export default async function Home() {
  return <HomeCalendar />;
}
