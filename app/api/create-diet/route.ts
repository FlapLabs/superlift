import { dietFormSchema } from "@/utils/validation";
import { NextResponse } from "next/server";
import { createDietPlan } from "@/utils/ai";

export const POST = async (request: Request) => {
  const userData = await request.json();
  const userDataParsed = dietFormSchema.parse(userData);

  const resForDiet = await createDietPlan(JSON.stringify(userDataParsed));

  const dietPlan = resForDiet.lc_kwargs.content;

  const jsonStr = dietPlan.slice(
    dietPlan.indexOf("{"),
    dietPlan.lastIndexOf("}") + 1
  );

  const jsonObj = JSON.parse(jsonStr);

  return NextResponse.json(jsonObj);
};
