
import {
  CardTitle,
  CardDescription,
  CardHeader,
  CardContent,
  Card,
} from "@/components/ui/card";

export function DietCard({ meals }) {
  return (
    <Card className="mx-auto max-w-md">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-bold">Diet Plan</CardTitle>
        <CardDescription>
          Your daily meal plan to keep you healthy and energized.
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        {meals && Object.keys(meals).length > 0 ? (
          Object.entries(meals).map(([mealTime, mealDescription], index) => (
            <div key={index} className="border rounded-lg p-4">
              <div className="grid gap-2">
                <h2 className="font-semibold">{mealTime}</h2>
                <div className="grid gap-1.5">
                  <div className="grid grid-cols-[auto_1fr] items-start gap-0.5">
                    <span>{mealDescription}</span>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="border rounded-lg p-4">
            <p className="text-gray-500 font-bold">
              Meal is not generated yet.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
