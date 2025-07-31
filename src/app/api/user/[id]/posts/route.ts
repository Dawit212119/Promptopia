import dbConnection from "@/lib/dbConnection";
import Prompt from "@/models/promptmodel";
import User from "@/models/usermodel";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  context: { params: { id: string } }
) {
  await dbConnection();
  const { id } = context.params;
  const userPosts = await Prompt.find({ user: id }).populate("user");
  return NextResponse.json({ userPosts });
}
