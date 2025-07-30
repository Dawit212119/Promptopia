"use client";
import PromptCard from "./promptCard";
interface postType {
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

export default function PromptCardList({
  data,
  handleDeleteAction,
  handleEditAction,
  handleTagClickAction,
}: {
  data: postType[];
  handleDeleteAction: (id: string) => Promise<void>;
  handleEditAction: (id: string) => void;
  handleTagClickAction?: (e: string) => void;
}) {
  return (
    <div className="mt-15 flex gap-7 flex-wrap">
      {data.map((post) => (
        <div key={post._id}>
          <PromptCard
            prompt={post}
            handleDeleteAction={handleDeleteAction}
            handleEditAction={handleEditAction}
            handleTagClickAction={handleTagClickAction}
          />
        </div>
      ))}
    </div>
  );
}
