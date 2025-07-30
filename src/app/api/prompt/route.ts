import dbConnection from "@/lib/dbConnection";
import Prompt from "@/models/promptmodel";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
  try {
    await dbConnection();
    const data = await Prompt.find().populate("user");
    console.log(data);
    return NextResponse.json({
      data,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ messg: error }).status;
  }
};
