import { NextRequest } from "next/server";
import dbConnection from "@/lib/dbConnection";
import Prompt from "@/models/promptmodel";

export const POST = async (req: NextRequest) => {
  const { tag, prompt, id } = await req.json();
  try {
    await dbConnection();
    const newPrompt = new Prompt({
      prompt,
      tag,
      user: id,
    });
    console.log(newPrompt);
    await newPrompt.save();
    return new Response(JSON.stringify(newPrompt), { status: 201 });
  } catch (error) {
    console.error(error);
    return new Response(
      JSON.stringify({ messg: "error while creating prompt " }),
      { status: 500 }
    );
  }
};
