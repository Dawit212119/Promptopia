import dbConnection from "@/lib/dbConnection";
import Prompt from "@/models/promptmodel";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
  try {
    await dbConnection();
    const datau = await Prompt.find().populate("user");
    console.log(datau);
    return NextResponse.json({
      datau,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ messg: error }).status;
  }
};
