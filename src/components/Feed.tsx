"use client";
import { useEffect, useState } from "react";
import PromptCard from "./promptCard";
import PromptCardList from "./promptCardList";
export default function Feed() {
  //   search bar
  // card
  interface PROMPT {
    id: string;
    prompt: string;
    tag: string;
    username: string;
    email: string;
    image: string;
  }

  const [promptData, setPrompt] = useState<PROMPT[] | []>([]);
  const [serachResult, setSearchResult] = useState<PROMPT[]>([]);
  const [search, setSearch] = useState<string>("");
  const [serachTimeOut, setSearchTimeOut] = useState<
    NodeJS.Timeout | undefined
  >();

  //   filter
  const filterPrompt = (searchText: string): PROMPT[] => {
    const regex = new RegExp(searchText);
    return promptData.filter(
      (post) =>
        regex.test(post.username) ||
        regex.test(post.prompt) ||
        regex.test(post.tag)
    );
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
      setPrompt(data);
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
      {search ? (
        <PromptCardList data={serachResult} />
      ) : (
        <PromptCardList data={promptData} />
      )}
    </section>
  );
}
