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
  handleDelete,
  handleEdit,
}: {
  data: postType[];
  handleDelete: Promise<void>;
  handleEdit: React.Cha;
}) {
  return (
    <div className="mt-15 flex gap-10">
      {data.map((post) => (
        <div key={post._id}>
          <PromptCard
            prompt={post}
            handleDelete={handleDelete}
            handleEdit={handleEdit}
          />
        </div>
      ))}
    </div>
  );
}
