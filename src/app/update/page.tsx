"use client";
import { useState } from "react";
import { useSession } from "next-auth/react";
import Form from "@/components/Form";
import { useRouter, useParams } from "next/navigation";
export default function UpdatePrompt() {
  const { data: session } = useSession();
  const { id } = useParams();
  const [submitting, setSubmitting] = useState(false);
  const [post, setPost] = useState({
    prompt: "",

    tag: "",
  });
  const [submit, setSubmit] = useState(true);
  const Router = useRouter();
  console.log(session);
  const updatePrompt = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setSubmitting(true);
      const response = await fetch(`/api/update/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt: post.prompt,
          tag: post.tag,
          id: session!.user.id,
        }),
      });
      const data = await response.json();
      console.log("response text", response.text);
      if (response.ok) {
        Router.push("/");
      }
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
        type="Update"
        post={post}
        submitting={submitting}
        setPost={setPost}
        handleSubmit={updatePrompt}
      />
    </div>
  );
}
