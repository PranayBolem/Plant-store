import PlantsList from "./components/PlantsList";

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
        <h1 className="mt-6 text-5xl font-extrabold tracking-tight text-zinc-950 dark:text-zinc-50 sm:text-[5rem]">All the plants you need.</h1>
        <PlantsList />
      </main>
    </div>
  );
}
