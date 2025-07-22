"use client";
import { useState } from "react";
import { useSession } from "next-auth/react";
import Form from "@/components/Form";

export default function creatPrompt() {
  const { data: session } = useSession();
  const [post, setPost] = useState({
    prompt: "",

    tag: "",
  });
  const [submit, setSubmit] = useState(true);

  const createPrompt = async () => {};

  return (
    <div>
      <Form
        type="create"
        post={post}
        setPost={setPost}
        handleSubmit={creatPrompt}
      />
    </div>
  );
}
