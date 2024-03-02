"use client";

import React, { useState } from "react";
import {
  CardTitle,
  CardDescription,
  CardHeader,
  CardContent,
  CardFooter,
  Card,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectGroup,
  SelectLabel,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { ActivityLevel, Gender } from "@/utils/enums";
import { makeDiet } from "@/utils/api";
import { useToast } from "@/components/ui/use-toast";
import { dietFormSchema } from "@/utils/validation";
import { zodResolver } from "@hookform/resolvers/zod";

export function DietForm({ updateDietPlan }) {
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
              <div className="space-y-2">
                <FormField
                  control={form.control}
                  name="age"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Age</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="20"
                          {...field}
                          onChange={(event) =>
                            field.onChange(+event.target.value)
                          }
                        />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="space-y-2">
                <FormField
                  control={form.control}
                  name="gender"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Gender</FormLabel>

                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select your Gender" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {Object.values(Gender).map((level) => (
                            <SelectItem key={level} value={level}>
                              {level.replace(/_/g, " ")}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormItem>
                  )}
                />
              </div>
              <div className="space-y-2">
                <FormField
                  control={form.control}
                  name="weight"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Weight (in kg)</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="80"
                          {...field}
                          onChange={(event) =>
                            field.onChange(+event.target.value)
                          }
                        />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="space-y-2">
                <FormField
                  control={form.control}
                  name="height"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Height (in cm)</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="170"
                          {...field}
                          onChange={(event) =>
                            field.onChange(+event.target.value)
                          }
                        />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <div className="space-y-2">
              <FormField
                control={form.control}
                name="activityLevel"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Activity Level</FormLabel>

                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select your Activity Level!" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {Object.values(ActivityLevel).map((level) => (
                          <SelectItem key={level} value={level}>
                            {level.replace(/_/g, " ")}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />
            </div>
            <div className="space-y-2">
              <FormField
                control={form.control}
                name="dietaryPreferences"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Dietary Preferences</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Enter your dietary preferences or restrictions"
                        {...field}
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="space-y-2">
              <FormField
                control={form.control}
                name="healthConditions"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Health Conditios or Concerns</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Enter your health conditions or concerns, if any."
                        {...field}
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
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
