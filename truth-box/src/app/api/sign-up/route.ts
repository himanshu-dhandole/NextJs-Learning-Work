import { sendVerificationEmail } from "@/src/helpers/sendVerificationEmail";
import dbConnect from "@/src/lib/dbConnect";
import UserModel from "@/src/model/User";
import bcrypt from "bcryptjs";
import { send } from "process";
export async function POST(request: Request) {
  await dbConnect();
  try {
    const { username, email, password } = await request.json();
    // Perform sign-up logic here (e.g., save user to database)
    const existingUserByVerifiedUsername = await UserModel.findOne({
      username,
      isVerified: true,
    });
    if (existingUserByVerifiedUsername) {
      return Response.json(
        {
          success: false,
          message: "Username is already taken.",
        },
        {
          status: 400,
        }
      );
    }
    const existingUserByEmail = await UserModel.findOne({
      email,
    });

    const otp = Math.floor(Math.random() * 900000 + 100000).toString();

    if (existingUserByEmail) {
      if (existingUserByEmail.isVerified) {
        return Response.json(
          {
            success: false,
            message: "Email is already registered.",
          },
          {
            status: 400,
          }
        );
      } else {
        const hashedPassword = await bcrypt.hash(password, 10);
        existingUserByEmail.password = hashedPassword;
        existingUserByEmail.verifyCodeExpiry = new Date(Date.now() + 3600000);
        existingUserByEmail.vefifyCode = otp;
        await existingUserByEmail.save();
      }
    } else {
      const hashedPassword = await bcrypt.hash(password, 10);
      const expiryDate = new Date();
      expiryDate.setHours(expiryDate.getHours() + 1);

      const newUser = new UserModel({
        username,
        email,
        password: hashedPassword,
        vefifyCode: otp,
        verifyCodeExpiry: expiryDate,
        isVerified: false,
        isAcceptingMessages: true,
        messages: [],
      });
      await newUser.save();
    }

    //send verification email
    const emailResponse = await sendVerificationEmail(username, email, otp);
    if (!emailResponse.success) {
      return Response.json(
        {
          success: false,
          message: emailResponse.message,
        },
        {
          status: 500,
        }
      );
    }

    return Response.json(
      {
        success: true,
        message: "sign-up successful. Verification email sent.",
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.log("Error in sign-up route:", error);
    return Response.json(
      {
        success: false,
        message: "sign-up failed.",
      },
      {
        status: 500,
      }
    );
  }
}
