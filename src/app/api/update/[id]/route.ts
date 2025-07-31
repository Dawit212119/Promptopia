import { auth } from "@/lib/auth";
import Prompt from "@/models/promptmodel";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(
  req: NextRequest,
  context: { params: { id: string } }
) {
  const id = context.params.id;
  const session = await auth();
  const isUser = await Prompt.findById(id);
  if (!isUser) {
    return NextResponse.json({ message: "Not Found!" }, { status: 404 });
  }
  if (isUser.user !== session?.user.id) {
    return NextResponse.json({ message: "unAuthorized" }, { status: 403 });
  }
  const { prompt, tag } = await req.json();
  const updated = await Prompt.findByIdAndUpdate(
    id,
    {
      ...(prompt && { prompt }),
      ...(tag && { tag }),
    },
    { new: true }
  );
  return NextResponse.json({ message: "update", updated });
}
