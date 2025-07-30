import Link from "next/link";
import React from "react";
type Post = {
  prompt: string;
  tag: string;
};
type FormType = {
  type: string;
  post: Post;
  submitting: boolean;
  setPost: React.Dispatch<React.SetStateAction<Post>>;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
};
export default function Form({
  type,
  post,
  setPost,
  submitting,
  handleSubmit,
}: FormType) {
  return (
    <section className="w-full flex justify-start items-start flex-col gap-4">
      <h1 className="w-full bg-gradient-to-r from-blue-600 to-cyan-400  text-transparent bg-clip-text">
        <span className="text-4xl font-extrabold"> {type} Prompt </span>
      </h1>
      <p className="text-gray-600 font-semibold max-w-2xl  pt-4">
        {type} and share amazing prompts with the world, and let your
        imagination run wild with any AI-powered platform
      </p>

      <form
        onSubmit={handleSubmit}
        className="w-full flex flex-col p-14 gap-8 glassmorphism"
      >
        <label className="flex flex-col gap-4">
          <span className="font-satoshi">Your Prompt</span>
          <textarea
            className="outline-0 h-[200px] text-sm p-2 rounded-lg"
            placeholder="Write your prompt..."
            value={post.prompt}
            onChange={(e) =>
              setPost((prevPost) => ({ ...prevPost, prompt: e.target.value }))
            }
          ></textarea>
        </label>
        <label className="flex flex-col gap-4">
          <span className="font-satoshi">#Tag</span>
          <textarea
            className="outline-0 h-[100px] text-sm p-2 rounded-lg"
            placeholder="#..."
            value={post.tag}
            onChange={(e) =>
              setPost((prevPost) => ({ ...prevPost, tag: e.target.value }))
            }
          ></textarea>
        </label>
        <div className="flex-end gap-5">
          <Link href="/">Cancel</Link>
          <button
            className="bg-green-500 p-3 rounded-2xl"
            disabled={submitting}
          >
            {submitting ? type : "Create"}
          </button>
        </div>
      </form>
    </section>
  );
}
