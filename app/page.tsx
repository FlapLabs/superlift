"use client";
import { useState } from "react";
import { DietForm } from "@/components/component/diet-form";
import { DietCard } from "@/components/component/diet-card";

export default function Home() {
  const [generatedDietPlan, setGeneratedDietPlan] = useState([]);

  // Function to update the diet plan state
  const updateDietPlan = (newDietPlan) => {
    setGeneratedDietPlan(newDietPlan);
  };

  return (
    <div>
      <div>
        <h1 className="pt-4 text-4xl font-semibold text-center">Superlift</h1>
      </div>
      <div className="py-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
        <DietForm updateDietPlan={updateDietPlan} />
        <DietCard meals={generatedDietPlan} />
      </div>
    </div>
  );
}
