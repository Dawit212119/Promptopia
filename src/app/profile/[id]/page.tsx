"use client";
import Profile from "@/components/profile";
import { useParams, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";

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
export default function OtherProfile() {
  const { id } = useParams();
  const searchParams = useSearchParams();
  const name = searchParams.get("name");
  const [data, setData] = useState<PROMPT[] | []>([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`/api/user/${id}/posts`);
        if (!response.ok) throw new Error("Error while requesting");
        const data = await response.json();
        if (data.error) throw new Error(data.error);
        setData(data.userPosts);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [id]);
  return (
    <Profile name={name!} post={data} desc="Welcome to My profile"></Profile>
  );
}
