import { dietFormSchema } from "@/utils/validation";
import { NextResponse } from "next/server";
import { createDietPlan } from "@/utils/ai";
import { z } from "zod";

export const POST = async (request: Request) => {
  try {
    const userData = await request.json();
    userData.age = parseInt(userData.age);
    userData.weight = parseInt(userData.weight);
    userData.height = parseInt(userData.height);
    const userDataParsed = dietFormSchema.parse(userData);

    const resForDiet = await createDietPlan(JSON.stringify(userDataParsed));

    const dietPlan = resForDiet.lc_kwargs.content;

    const jsonStr = dietPlan.slice(
      dietPlan.indexOf("{"),
      dietPlan.lastIndexOf("}") + 1
    );

    const jsonObj = JSON.parse(jsonStr);

    return NextResponse.json({ message: jsonObj });
  } catch (error) {
    if (error instanceof z.ZodError) {
      // If it's a ZodError, extract the error messages
      const errorMessages = error.errors.map((e) => e.message);
      return NextResponse.json({ errors: errorMessages });
    }

    return NextResponse.json({ error });
  }
};
