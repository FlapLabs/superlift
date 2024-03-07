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
        "Suggestions for the user, based on the provided health problem or concerns"
      ),
    "Diet Preference": z
      .string()
      .describe(
        "Diet Preference of the created meal, whether vegeterian or non-vegeterian."
      ),
  })
);

const getPromptForDietPlan = async (content) => {
  const format_instructions = parserForDietPlan.getFormatInstructions();

  const prompt = new PromptTemplate({
    template:
      "Create a customized diet plan with calorie estimates for each meal, ensuring a balanced macronutrient distribution and diverse food choices. Add calories as well for the meals. Also please parse their dietPreference and only show their respective food choice (either vegeterian or non-vegeterian) Follow the instructions and format your response to match the format instructions, no matter what! \n{format_instructions}\n{entry}",
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
