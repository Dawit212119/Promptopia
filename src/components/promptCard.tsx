"use client";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useState } from "react";

interface card {
  _id: string;

  prompt: string;
  tag: string;
  user: {
    _id: string;
    username: string;
    email: string;
    image: string;
  };
}

export default function PromptCard({
  prompt,
  handleEditAction,
  handleDeleteAction,
  handleTagClickAction,
}: {
  prompt: card | null;
  handleDeleteAction: (id: string) => Promise<void>;
  handleEditAction: (id: string) => void;
  handleTagClickAction: (id: string) => void;
}) {
  const { data: session } = useSession();
  const [copied, setCopied] = useState<boolean>(false);
  const handleCopy = () => {
    setCopied(true);
  };
  console.log(prompt);
  return (
    <section className="break-inside-avoid md:w-[360px] p-3 rounded-md border-gray-200 h-fit w-full backdrop-blur-lg bg-clip-padding backdrop-filter bg-white/20  border">
      <div className=" flex justify-between">
        <div className="flex gap-4 items-center">
          <Image
            className="rounded-full cursor-pointer"
            src={prompt!.user!.image}
            width={30}
            height={30}
            alt=""
          />
          <div className="text-sm">
            <span className="font-satoshi font-bold">
              {prompt?.user.username}
            </span>
            <p className="font-inter text-sm text-gray-400">
              {prompt?.user.email}
            </p>
          </div>
        </div>
        <div className="cursor-pointer">
          <Image
            width={20}
            onClick={() => handleCopy()}
            height={20}
            src={`${
              copied ? "/assets/icons/tick.svg" : "/assets/icons/copy.svg"
            }`}
            alt="copy"
          />
        </div>
      </div>
      <p className="my-4">{prompt?.prompt}</p>

      <div
        className="font-inter blue_gradient"
        onClick={() => handleTagClickAction(prompt?.tag!)}
      >
        #{prompt?.tag}
      </div>
      <>
        {prompt?.user._id.toString() === session?.user.id && (
          <div className="flex flex-end">
            <span
              className="font-bold "
              onClick={() => handleEditAction && handleEditAction(prompt!._id)}
            >
              Edit
            </span>
            <span
              className="font-bold"
              onClick={() =>
                handleDeleteAction && handleDeleteAction(prompt!._id)
              }
            >
              Delete
            </span>
          </div>
        )}
      </>
    </section>
  );
}
