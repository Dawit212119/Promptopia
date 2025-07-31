"use client";
import Profile from "@/components/profile";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
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
export default function MyProfile() {
  const [data, setData] = useState<PROMPT[] | []>([]);
  const { data: session } = useSession();
  const router = useRouter();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`/api/user/${session?.user.id}`);
        if (!response.ok) throw new Error("Error while requesting");
        const data = await response.json();
        if (data.error) throw new Error(data.error);
        setData(data.userPosts);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [session?.user.id]);
  const handleEditAction = (id: string) => {
    const respo = router.push(`/update/${id}/posts`);
  };
  const handleDeleteAction = async (id: string) => {
    const is = confirm("Are you shure to delete");
    if (is) {
      setData((prev) => prev.filter((pre) => pre._id !== id));
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
  return (
    <Profile
      name="My"
      post={data}
      desc="Welcome to your profile"
      handleDeleteAction={handleDeleteAction}
      handleEditAction={handleEditAction}
    />
  );
}
