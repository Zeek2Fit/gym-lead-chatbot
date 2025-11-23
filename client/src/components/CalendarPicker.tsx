import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Calendar, Clock } from "lucide-react";

interface CalendarPickerProps {
  onBook: (date: string, time: string) => void;
}

const timeSlots = [
  "6:00 AM", "6:30 AM", "7:00 AM", "7:30 AM",
  "8:00 AM", "8:30 AM", "9:00 AM", "9:30 AM",
  "10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM",
  "12:00 PM", "12:30 PM", "1:00 PM", "1:30 PM",
  "2:00 PM", "2:30 PM", "3:00 PM", "3:30 PM",
  "4:00 PM", "4:30 PM", "5:00 PM", "5:30 PM",
  "6:00 PM", "6:30 PM", "7:00 PM", "7:30 PM",
];

export default function CalendarPicker({ onBook }: CalendarPickerProps) {
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");

  const getNext7Days = () => {
    const days = [];
    const today = new Date();
    
    for (let i = 1; i <= 7; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      
      const dayOfWeek = date.getDay();
      if (dayOfWeek !== 0) {
        days.push({
          date: date.toISOString().split("T")[0],
          display: date.toLocaleDateString("en-US", {
            weekday: "short",
            month: "short",
            day: "numeric",
          }),
        });
      }
    }
    
    return days;
  };

  const availableDays = getNext7Days();

  const handleBook = () => {
    if (selectedDate && selectedTime) {
      const formattedDate = new Date(selectedDate).toLocaleDateString("en-US", {
        weekday: "long",
        month: "long",
        day: "numeric",
      });
      onBook(formattedDate, selectedTime);
    }
  };

  return (
    <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="space-y-2">
        <div className="flex items-center gap-2 text-sm font-medium mb-3">
          <Calendar className="h-4 w-4 text-primary" />
          <span>Select a day (Mon-Sat)</span>
        </div>
        <div className="grid grid-cols-2 gap-2">
          {availableDays.map((day) => (
            <Button
              key={day.date}
              variant={selectedDate === day.date ? "default" : "outline"}
              onClick={() => setSelectedDate(day.date)}
              className="h-auto py-3 text-sm"
              data-testid={`button-date-${day.date}`}
            >
              {day.display}
            </Button>
          ))}
        </div>
      </div>

      {selectedDate && (
        <div className="space-y-2 animate-in fade-in slide-in-from-bottom-2 duration-300">
          <div className="flex items-center gap-2 text-sm font-medium mb-3">
            <Clock className="h-4 w-4 text-primary" />
            <span>Select a time</span>
          </div>
          <div className="grid grid-cols-3 gap-2 max-h-60 overflow-y-auto pr-2">
            {timeSlots.map((time) => (
              <Button
                key={time}
                variant={selectedTime === time ? "default" : "outline"}
                onClick={() => setSelectedTime(time)}
                className="h-auto py-2 text-xs"
                data-testid={`button-time-${time.replace(/[:\s]/g, "-")}`}
              >
                {time}
              </Button>
            ))}
          </div>
        </div>
      )}

      {selectedDate && selectedTime && (
        <Button
          onClick={handleBook}
          className="w-full"
          data-testid="button-confirm-booking"
        >
          Book My Free Session
        </Button>
      )}
    </div>
  );
}
