'use client'

import React, { useState } from "react";
import {
  CardTitle,
  CardDescription,
  CardHeader,
  CardContent,
  CardFooter,
  Card,
} from "@/components/ui/card";
import { Form, FormMessage } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { dietFormSchema } from "@/utils/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { ActivityLevel, Gender } from "@/utils/enums";
import { makeDiet } from "@/utils/api";
import { CustomFormField } from "@/components/component/form-field";

export default function DietForm({ updateDietPlan }) {
  const { toast } = useToast();

  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  const form = useForm<z.infer<typeof dietFormSchema>>({
    resolver: zodResolver(dietFormSchema),
  });

  const onSubmit = async (data: z.infer<typeof dietFormSchema>) => {
    setIsButtonDisabled(true);

    try {
      const generatedDietPlan = await makeDiet({ userData: data });

      if (generatedDietPlan && generatedDietPlan.message) {
        toast({
          variant: "success",
          title: "Diet Plan Generated Successfully",
        });
      } else {
        toast({
          variant: "destructive",
          title: "Failed to create diet.",
          description: JSON.stringify(generatedDietPlan.errors[0]),
        });
      }

      updateDietPlan(generatedDietPlan.message);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong!",
        description: error.message,
      });
    } finally {
      setIsButtonDisabled(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <Card className="mx-auto max-w-[350px]">
          <CardHeader>
            <CardTitle className="text-xl">
              AI-Powered Diet Plan Generator
            </CardTitle>
            <CardDescription>
              Enter your information to generate a personalized diet plan
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <CustomFormField
                control={form.control}
                name="age"
                label="Age"
                type="number"
                placeholder="20"
              />
              <CustomFormField
                control={form.control}
                name="gender"
                label="Gender"
                type="select"
                options={Object.values(Gender)}
                placeholder="Select your Gender"
              />
              <CustomFormField
                control={form.control}
                name="weight"
                label="Weight (in kg)"
                type="number"
                placeholder="80"
              />
              <CustomFormField
                control={form.control}
                name="height"
                label="Height (in cm)"
                type="number"
                placeholder="170"
              />
            </div>
            <CustomFormField
              control={form.control}
              name="activityLevel"
              label="Activity Level"
              type="select"
              options={Object.values(ActivityLevel)}
              placeholder="Select your Activity Level!"
            />
            <CustomFormField
              control={form.control}
              name="dietaryPreferences"
              label="Dietary Preferences"
              textarea
              placeholder="Enter your dietary preferences or restrictions"
            />
            <CustomFormField
              control={form.control}
              name="healthConditions"
              label="Health Conditions or Concerns"
              textarea
              placeholder="Enter your health conditions or concerns, if any."
            />
          </CardContent>
          <CardFooter>
            <Button
              type="submit"
              className="ml-auto"
              disabled={isButtonDisabled}
            >
              Generate Diet Plan
            </Button>
          </CardFooter>
        </Card>
      </form>
    </Form>
  );
}
