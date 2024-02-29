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
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { dietFormSchema } from "@/utils/validation";
import { ActivityLevel, Gender } from "@/utils/enums";
import { makeDiet } from "@/utils/api";
import { z } from "zod";
import { NextResponse } from "next/server";

export function DietForm({ updateDietPlan }) {
  const [formData, setFormData] = useState({
    age: "",
    gender: Gender.MALE,
    weight: "",
    height: "",
    activityLevel: ActivityLevel.SEDENTARY,
    dietaryPreferences: "",
    healthConditions: "",
  });

  const [isButtonDisabled, setIsButtonDisabled] = useState(false); // New state

  const handleChange = async (e) => {
    const { id, value } = e.target;
    const numericValue =
      id === "age" || id === "weight" || id === "height"
        ? parseFloat(value)
        : value;
    setFormData((prevData) => ({ ...prevData, [id]: numericValue }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsButtonDisabled(true);

    try {
      const generatedDietPlan = await makeDiet({ userData: formData });

      updateDietPlan(generatedDietPlan);
    } catch (error) {
      console.error("Error generating diet plan:", error);
      if (error instanceof z.ZodError) {
        // If it's a ZodError, extract the error messages
        const errorMessages = error.errors.map((e) => e.message);
        return NextResponse.json({ errors: errorMessages });
      }

      return NextResponse.json({ error });
    } finally {
      setIsButtonDisabled(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
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
              <Label htmlFor="age">Age</Label>
              <Input
                id="age"
                type="number"
                placeholder="30"
                value={formData.age}
                onChange={handleChange}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="gender">Gender</Label>
              <Select
                id="gender"
                value={formData.gender}
                onChange={handleChange}
              >
                <SelectTrigger className="w-[150px]">
                  <SelectValue placeholder="Select Gender" />
                </SelectTrigger>
                <SelectContent>
                  {Object.values(Gender).map((gender) => (
                    <SelectItem key={gender} value={gender}>
                      {gender.charAt(0).toUpperCase() + gender.slice(1)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="weight">Weight (kg)</Label>
              <Input
                id="weight"
                type="number"
                placeholder="70"
                value={formData.weight}
                onChange={handleChange}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="height">Height (cm)</Label>
              <Input
                id="height"
                type="number"
                placeholder="170"
                value={formData.height}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="activity-level">Activity Level</Label>
            <Select
              id="activityLevel"
              value={formData.activityLevel}
              onChange={handleChange}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select Activity Level" />
              </SelectTrigger>
              <SelectContent>
                {Object.values(ActivityLevel).map((level) => (
                  <SelectItem key={level} value={level}>
                    {level.replace(/_/g, " ")}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="dietary-preferences">
              Dietary Preferences/Restrictions
            </Label>
            <Textarea
              id="dietaryPreferences"
              placeholder="Enter your dietary preferences or restrictions"
              value={formData.dietaryPreferences}
              onChange={handleChange}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="health-conditions">
              Health Conditions/Concerns
            </Label>
            <Textarea
              id="healthConditions"
              placeholder="Enter your health conditions or concerns"
              value={formData.healthConditions}
              onChange={handleChange}
            />
          </div>
        </CardContent>
        <CardFooter>
          <Button type="submit" className="ml-auto" disabled={isButtonDisabled}>
            Generate Diet Plan
          </Button>
        </CardFooter>
      </Card>
    </form>
  );
}
