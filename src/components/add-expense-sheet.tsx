
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Textarea } from "@/components/ui/textarea";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  CalendarIcon,
  Pizza,
  Car,
  BookOpen,
  Clapperboard,
  HeartPulse,
  ShoppingBag,
  MoreHorizontal,
  LucideIcon,
  Delete,
} from "lucide-react";
import { Calendar } from "./ui/calendar";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { useToast } from "@/hooks/use-toast";

type Category =
  | "Food"
  | "Transport"
  | "Education"
  | "Entertainment"
  | "Healthcare"
  | "Shopping"
  | "Other";

const categories: {
  name: Category;
  icon: LucideIcon;
  color: string;
  bgColor: string;
}[] = [
  { name: "Food", icon: Pizza, color: "text-orange-600", bgColor: "bg-orange-100" },
  { name: "Transport", icon: Car, color: "text-blue-600", bgColor: "bg-blue-100" },
  { name: "Education", icon: BookOpen, color: "text-purple-600", bgColor: "bg-purple-100" },
  { name: "Entertainment", icon: Clapperboard, color: "text-red-600", bgColor: "bg-red-100" },
  { name: "Healthcare", icon: HeartPulse, color: "text-green-600", bgColor: "bg-green-100" },
  { name: "Shopping", icon: ShoppingBag, color: "text-pink-600", bgColor: "bg-pink-100" },
  { name: "Other", icon: MoreHorizontal, color: "text-gray-600", bgColor: "bg-gray-100" },
];

function NumberPad({
  onKeyPress,
  onDelete,
  onClear,
}: {
  onKeyPress: (key: string) => void;
  onDelete: () => void;
  onClear: () => void;
}) {
  const keys = [ "1", "2", "3", "4", "5", "6", "7", "8", "9", ".", "0"];

  return (
    <div className="grid grid-cols-3 gap-2">
      {keys.map((key) => (
        <Button
          key={key}
          variant="outline"
          className="h-14 md:h-16 text-xl md:text-2xl font-bold transition-transform active:scale-95"
          onClick={() => onKeyPress(key)}
        >
          {key}
        </Button>
      ))}
       <Button
        variant="outline"
        className="h-14 md:h-16 text-xl md:text-2xl font-bold transition-transform active:scale-95 flex items-center justify-center"
        onClick={onDelete}
        onLongPress={onClear}
        aria-label="Delete last digit"
      >
        <Delete className="w-7 h-7 md:w-8 md:h-8" />
      </Button>
    </div>
  );
}

export function AddExpenseSheet({ children }: { children?: React.ReactNode }) {
  const [amount, setAmount] = useState("0");
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [notes, setNotes] = useState("");
  const { toast } = useToast();
  const [open, setOpen] = useState(false);

  const handleKeyPress = (key: string) => {
    if (key === "." && amount.includes(".")) return;
    setAmount((prev) => (prev === "0" && key !== "." ? key : prev + key));
  };

  const handleDelete = () => {
    setAmount((prev) => (prev.length > 1 ? prev.slice(0, -1) : "0"));
  };
  
  const handleClear = () => setAmount("0");

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (parseFloat(amount) === 0 || !selectedCategory) {
        toast({
            variant: "destructive",
            title: "Missing Information",
            description: "Please enter an amount and select a category.",
        });
        return;
    }
    toast({
      title: "Expense Added",
      description: `₹${amount} for ${selectedCategory} has been recorded.`,
    });
    setAmount("0");
    setSelectedCategory(null);
    setNotes("");
    setDate(new Date());
    setOpen(false); // Close the sheet
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      {children}
      <SheetContent side="bottom" className="rounded-t-2xl h-[90vh] md:h-auto md:max-w-md md:right-auto md:left-1/2 md:-translate-x-1/2 flex flex-col">
        <SheetHeader className="text-center">
          <SheetTitle className="text-xl md:text-2xl">Add a New Expense</SheetTitle>
        </SheetHeader>
        <form onSubmit={handleSubmit} className="flex flex-col flex-grow">
          <div className="flex-grow overflow-y-auto p-1">
              {/* Amount Display */}
              <div className="text-center my-4">
                  <span className="text-4xl md:text-5xl font-bold">
                  ₹{amount}
                  </span>
              </div>
              
              {/* Category Selector */}
              <div className="my-6">
                <Label className="text-center block mb-4 text-sm">Select Category</Label>
                <div className="grid grid-cols-4 sm:grid-cols-7 gap-2 md:gap-4">
                    {categories.map((cat) => (
                    <button
                        type="button"
                        key={cat.name}
                        className={cn(
                        "flex flex-col items-center justify-center p-2 rounded-xl border-2 transition-all",
                        selectedCategory === cat.name
                            ? `${cat.bgColor} ${cat.color.replace('text-', 'border-')} scale-110 shadow-lg`
                            : "bg-muted/50 border-transparent opacity-70"
                        )}
                        onClick={() => setSelectedCategory(cat.name)}
                        aria-pressed={selectedCategory === cat.name}
                    >
                        <cat.icon className={cn("w-7 h-7 md:w-8 md:h-8 mb-1", cat.color)} />
                        <span className="text-xs font-medium">{cat.name}</span>
                    </button>
                    ))}
                </div>
              </div>

              {/* Number Pad */}
              <div className="my-6">
                <NumberPad onKeyPress={handleKeyPress} onDelete={handleDelete} onClear={handleClear} />
              </div>

               {/* Optional Fields */}
              <div className="space-y-4 my-6">
                 <div className="grid w-full items-center gap-1.5">
                    <Label htmlFor="description" className="text-sm">Note (Optional)</Label>
                    <Textarea id="description" placeholder="What was this for?" value={notes} onChange={(e) => setNotes(e.target.value)} />
                </div>
                <div className="grid w-full items-center gap-1.5">
                  <Label htmlFor="date-popover-trigger" className="text-sm">Date</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        id="date-popover-trigger"
                        variant={"outline"}
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !date && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {date ? format(date, "PPP") : <span>Pick a date</span>}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={date}
                        onSelect={setDate}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>
          </div>

          <SheetFooter className="mt-auto">
              <Button type="submit" size="lg" className="w-full">Save Expense</Button>
          </SheetFooter>
        </form>
      </SheetContent>
    </Sheet>
  );
}
