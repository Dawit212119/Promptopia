import Image from "next/image";

interface card {
  prompt: string;
  tag: string;
  username: string;
  email: string;
  image: string;
}

export default function PromptCard({ prompt }: { prompt: card | null }) {
  return (
    <section className="flex flex-col  break-inside-avoid md:w-[360px] p-3 rounded-md border-gray-200 h-fit w-full backdrop-blur-lg bg-clip-padding backdrop-filter bg-white/20 mt-30 border">
      <div className="flex gap-4 items-center">
        <Image
          className="rounded-full"
          src="/assets/images/logo.svg"
          width={30}
          height={30}
          alt=""
        />
        <div className="text-sm">
          <span>{prompt?.username} knvklndskl</span>
          <p>{prompt?.email} njcbvjkdhfliaeoisd</p>
        </div>
      </div>
    </section>
  );
}
