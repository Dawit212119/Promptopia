"use client";
import { useEffect, useState } from "react";
import PromptCard from "./promptCard";
import PromptCardList from "./promptCardList";
import { useRouter } from "next/navigation";
import { Spinner, type SpinnerProps } from "@/components/ui/shadcn-io/spinner";
export default function Feed() {
  //   search bar
  // card
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

  const [promptData, setPrompt] = useState<PROMPT[] | []>([]);
  const [serachResult, setSearchResult] = useState<PROMPT[]>([]);
  const [search, setSearch] = useState<string>("");
  const route = useRouter();
  const [serachTimeOut, setSearchTimeOut] = useState<
    NodeJS.Timeout | undefined
  >();

  //   filter
  const filterPrompt = (searchText: string): PROMPT[] => {
    const regex = new RegExp(searchText, "i");
    return promptData.filter(
      (post) =>
        regex.test(post.user.username) ||
        regex.test(post.prompt) ||
        regex.test(post.tag)
    );
  };
  //  Edit
  const handleEditAction = (id: string) => {
    const respo = route.push(`/update/${id}`);
  };
  const handleDeleteAction = async (id: string) => {
    const is = confirm("Are you shure to delete");
    if (is) {
      setPrompt((prev) => prev.filter((pre) => pre._id !== id));
      try {
        const response = await fetch(`/api/delete/${id}`);
        if (!response.ok) {
          throw new Error("error while recieve response");
        }
        const data = await response.json();
      } catch (error) {
        console.log(error);
      }
    }
  };
  const handleTagClickAction = (e: string) => {
    setSearch(e);
    const SearchResult = filterPrompt(e);
    setSearchResult(SearchResult);
  };
  const handleSearchChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    clearTimeout(serachTimeOut);
    setSearch(e.target.value);
    // debouce
    setSearchTimeOut(
      setTimeout(() => {
        const searchResult = filterPrompt(e.target.value);
        setSearchResult(searchResult);
      }, 500)
    );
  };
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("/api/prompt");
      const data = await response.json();
      setPrompt(data.data);
    };
    fetchData();
  }, []);
  console.log(search);
  return (
    <section className="flex flex-col gap-10">
      <form className="flex justify-center mt-10">
        {" "}
        <input
          value={search}
          onChange={handleSearchChange}
          className="sm:w-[700px] w-[300px] text-left font-satoshi bg-white rounded-md px-2 focus:border-black py-1.5 outline-0 bottom-1  shadow-lg "
        ></input>{" "}
      </form>
      {promptData.length === 0 && (
        <span className="mx-auto  my-15">
          {" "}
          <Spinner variant="circle" />{" "}
        </span>
      )}
      {search ? (
        <PromptCardList
          data={serachResult}
          handleDeleteAction={handleDeleteAction}
          handleEditAction={handleEditAction}
          handleTagClickAction={handleTagClickAction}
        />
      ) : (
        <PromptCardList
          data={promptData}
          handleDeleteAction={handleDeleteAction}
          handleEditAction={handleEditAction}
          handleTagClickAction={handleTagClickAction}
        />
      )}
    </section>
  );
}
