import dbConnection from "@/lib/dbConnection";
import Prompt from "@/models/promptmodel";
import { NextRequest, NextResponse } from "next/server";
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
export const GET = async (req: NextRequest): Promise<Response> => {
  try {
    await dbConnection();
    const datau = await Prompt.find().populate("user");
    console.log(datau);
    return NextResponse.json({
      datau,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ messg: error }, { status: 500 });
  }
};
