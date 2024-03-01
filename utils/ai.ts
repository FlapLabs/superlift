import { z } from "zod";
import { OpenAI } from "@langchain/openai";
// import { GooglePaLM } from "langchain/llms/googlepalm";
import { PromptTemplate } from "@langchain/core/prompts";
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";

import {
  StructuredOutputParser,
  OutputFixingParser,
} from "langchain/output_parsers";

// For Creating Diet Plan

const parserForDietPlan = StructuredOutputParser.fromZodSchema(
  z.object({
    Morning: z.string().describe("Morning meal."),
    "Mid Morning Snacks": z.string().describe("Mid Morning Snacks."),
    Lunch: z.string().describe("Lunch."),
    "Evening Snacks": z.string().describe("Evening Snacks."),
    Dinner: z.string().describe("Dinner."),
    Suggestions: z
      .string()
      .describe(
        "Suggestions for the user, anything that can help them in their diet journey."
      ),
    "Diet Preference": z
      .string()
      .describe(
        "Diet preference of the user. (Either Vegetarian or Non-Vegetarian)"
      ),
  })
);

const getPromptForDietPlan = async (content) => {
  const format_instructions = parserForDietPlan.getFormatInstructions();

  const prompt = new PromptTemplate({
    template:
      "Create a customized diet plan based on the given parameters provided by the user. Add calories as well for the meals. Also please parse their dietPreference and only show their respective food choice (either veg or non-veg) Follow the instructions and format your response to match the format instructions, no matter what! \n{format_instructions}\n{entry}",
    inputVariables: ["entry"],
    partialVariables: { format_instructions },
  });

  const input = await prompt.format({ entry: content });
  return input;
};

export const createDietPlan = async (content) => {
  const input = await getPromptForDietPlan(content);

  const model = new ChatGoogleGenerativeAI({
    temperature: 0,
    modelName: "gemini-pro",
    apiKey: process.env.GEMINI_KEY,
  });
  const output = await model.invoke(input);
  return output;
};
