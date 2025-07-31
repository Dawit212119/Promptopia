import dbConnection from "@/lib/dbConnection";
import Prompt from "@/models/promptmodel";
import User from "@/models/usermodel";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    await dbConnection();
    const params = await context.params;
    const id = params.id;
    const userPosts = await Prompt.find({ user: id }).populate("user");
    return NextResponse.json({ userPosts });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: error });
  }
}
