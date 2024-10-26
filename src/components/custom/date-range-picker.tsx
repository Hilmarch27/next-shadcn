/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import { addDays, format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "../ui/calendar";
import { id } from "date-fns/locale"; // Locale bahasa Indonesia
import { DateRange } from "react-day-picker";
import { useState } from "react";

interface DatePickerWithRangeProps {
  form: ReturnType<typeof useForm<any>>;
  fieldName: string;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
  limitToTwoMonths?: boolean; // Props to control the two-month limit
}

export function DatePickerWithRange({
  form,
  fieldName,
  placeholder,
  disabled,
  className,
  limitToTwoMonths = false, // Default is false, can be passed as true from parent
}: DatePickerWithRangeProps) {
  const [date, setDate] = useState<DateRange | undefined>({
    from: new Date(2022, 0, 20),
    to: addDays(new Date(2022, 0, 20), 20),
  });

  const currentMonth = new Date(); // Get the current month
  const nextMonth = new Date(
    currentMonth.getFullYear(),
    currentMonth.getMonth() + 1
  ); // Get the next month

  return (
    <Form {...form}>
      <FormField
        control={form.control}
        name={fieldName as any}
        render={({ field }) => (
          <FormItem>
            <Popover>
              <FormLabel>{placeholder}</FormLabel>
              <FormControl>
                <div className={cn("grid gap-2", className)}>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        disabled={disabled}
                        id="date"
                        variant={"outline"}
                        className={cn(
                          "w-[300px] h-10 justify-start text-left font-normal",
                          !date && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {date?.from ? (
                          date.to ? (
                            <>
                              {format(date.from, "dd MMMM yyyy", {
                                locale: id,
                              })}{" "}
                              -{" "}
                              {format(date.to, "dd MMMM yyyy", {
                                locale: id,
                              })}
                            </>
                          ) : (
                            format(date.from, "dd MMMM yyyy", { locale: id })
                          )
                        ) : (
                          <span>Pilih tanggal</span>
                        )}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        initialFocus
                        mode="range"
                        defaultMonth={date?.from}
                        selected={date}
                        onSelect={(newDate) => {
                          setDate(newDate);
                          field.onChange(newDate); // Update form field value
                        }}
                        numberOfMonths={2}
                        // Limit calendar to show only the current and next month if the limit is active
                        fromMonth={limitToTwoMonths ? currentMonth : undefined}
                        toMonth={limitToTwoMonths ? nextMonth : undefined}
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              </FormControl>
              <FormMessage />
            </Popover>
          </FormItem>
        )}
      />
    </Form>
  );
}