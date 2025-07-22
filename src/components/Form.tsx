import React from "react";
type Post = {
  prompt: string;
  tag: string;
};
type FormType = {
  type: string;
  post: Post;
  setPost: React.Dispatch<React.SetStateAction<Post>>;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
};
export default function Form({ type, post, setPost, handleSubmit }: FormType) {
  return (
    <section className="w-full flex justify-start items-start flex-col ">
      <h1 className="bg-gradient-to-r from-blue-600 to-cyan-400  text-transparent bg-clip-text">
        <span className="text-2xl "> {type} prompt </span>
      </h1>
      <p>
        {type} and share amazing prompts with the world, and let your
        imagination run wild with any AI-powered platform
      </p>
    </section>
  );
}
