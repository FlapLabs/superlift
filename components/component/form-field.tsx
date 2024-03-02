// CustomFormField.js
import React from "react";
import {
  FormField,
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

export const CustomFormField = ({
  control,
  name,
  label,
  type = "text",
  options,
  placeholder,
  textarea,
}) => (
  <FormField
    control={control}
    name={name}
    render={({ field }) => (
      <FormItem>
        <FormLabel>{label}</FormLabel>
        <FormControl>
          {textarea ? (
            <Textarea placeholder={placeholder} {...field} />
          ) : (
            <>
              {type === "select" ? (
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder={placeholder} />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {options.map((option) => (
                      <SelectItem key={option} value={option}>
                        {option.replace(/_/g, " ")}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              ) : (
                <Input
                  type={type}
                  placeholder={placeholder}
                  {...field}
                  onChange={(event) => field.onChange(+event.target.value)}
                />
              )}
            </>
          )}
        </FormControl>
        <FormMessage />
      </FormItem>
    )}
  />
);
