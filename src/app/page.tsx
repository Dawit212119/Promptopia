import Feed from "@/components/Feed";

export default function page() {
  console.log("home");
  return (
    <main className="max-w-7xl">
      <section className="flex  flex-col justify-center items-center gap-2">
        <h1 className="font-bold leading-[1.15] text-6xl sm:text-4xl mt-5">
          Discover & share
          <br className="max-md:hidden" />
          <span className="text-2xl text-center  bg-gradient-to-r  from-amber-500 via-orange-600 to-yellow-500 bg-clip-text text-transparent">
            AI-powered Prompts
          </span>
        </h1>

        <p className="text-gray-600 text-center">
          Promptopia is an open-source AI Prompting tool for modern world to
          discover,create and share creative prompts
        </p>
      </section>
      <Feed />
    </main>
  );
}
