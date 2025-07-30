import PromptCard from "./promptCard";
interface postType {
  id: string;
  prompt: string;
  tag: string;
  username: string;
  email: string;
  image: string;
}

export default function PromptCardList({ data }: { data: postType[] }) {
  return (
    <div className="mt-15">
      {data.map((post) => (
        <PromptCard key={post.id} prompt={post} />
      ))}
    </div>
  );
}
