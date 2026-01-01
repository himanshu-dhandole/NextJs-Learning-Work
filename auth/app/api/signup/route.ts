import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const dataJson = await req.json();
  const prismaClient = new PrismaClient();
  console.log("Received signup data:", dataJson);

  prismaClient.user.create({
    data: {
      username : dataJson.username ,
      password : dataJson.password
    }
  })
  return NextResponse.json({
    message: "User signed up successfully",
  });
}
