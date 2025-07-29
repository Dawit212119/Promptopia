"use client";
import { useState } from "react";
import { useSession } from "next-auth/react";
import Form from "@/components/Form";

export default function creatPrompt() {
  const { data: session } = useSession();
  const [submitting, setSubmitting] = useState(false);
  const [post, setPost] = useState({
    prompt: "",

    tag: "",
  });
  const [submit, setSubmit] = useState(true);

  const createPrompt = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setSubmitting(true);
      const response = await fetch("/api/prompt", {
        method: "POST",
        body: JSON.stringify({
          post: post.prompt,
          tag: post.tag,
          id: session!.user.id,
        }),
      });
      const data = await response.json();
      console.log("response text", response.text);
      console.log(data);
    } catch (error) {
      console.log("Error createing prompt", error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="w-[800px] flex justify-center items-center pt-50">
      <Form
        type="Create"
        post={post}
        submitting={submitting}
        setPost={setPost}
        handleSubmit={creatPrompt}
      />
    </div>
  );
}
