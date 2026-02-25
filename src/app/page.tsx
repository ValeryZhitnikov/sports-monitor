import { Datepicker } from "@/src/app/components/Datepicker/Datepicker";
import { HomeEventsList } from "@/src/app/components/HomeEventsList";

export type PageProps = {
  searchParams?: Promise<{
    date?: string
  }>;
};

export default async function Home({searchParams}: PageProps) {
  const info = await searchParams;
  const day = info?.date 
        ? new Date(info?.date)
        : new Date();

  return (
    <>
      <Datepicker />
      <HomeEventsList day={day} />
    </>
  );
}
