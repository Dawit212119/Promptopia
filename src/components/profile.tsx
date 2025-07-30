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
  handleDeleteAction: (id: string) => Promise<void>;
  handleEditAction: (id: string) => void;
  desc: string;
}) {
  return (
    <section>
      <h1 className="">{name} Profile</h1>
      <p>{desc}</p>

      <PromptCardList
        data={post}
        handleDeleteAction={handleDeleteAction}
        handleEditAction={handleEditAction}
      />
    </section>
  );
}
