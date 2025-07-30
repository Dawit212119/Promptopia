import React from "react";
import PromptCardList from "./promptCardList";
interface PROMPT {
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
export default function Profile({
  name,
  post,
  handleDeleteAction,
  handleEditAction,
  desc,
}: {
  name: string;
  post: PROMPT[];
  handleDeleteAction?: (id: string) => Promise<void>;
  handleEditAction?: (id: string) => void;
  desc: string;
}) {
  return (
    <section className="w-full">
      <h1 className="head_text text-left">
        <span className="blue_gradient">{name} Profile</span>
      </h1>
      <p className="desc text-left">{desc}</p>

      <PromptCardList
        data={post}
        handleDeleteAction={handleDeleteAction}
        handleEditAction={handleEditAction}
      />
    </section>
  );
}
