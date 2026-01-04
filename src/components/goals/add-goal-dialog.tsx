
'use client';

import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose
} from '@/components/ui/dialog';
import { Button, buttonVariants } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { CalendarIcon, Plus, Laptop, Car, Gift, Headphones, Plane, PiggyBank, BookOpen } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import type { Goal } from '@/lib/types';
import type { LucideIcon } from 'lucide-react';

const goalIcons: { name: string; icon: LucideIcon }[] = [
  { name: 'Laptop', icon: Laptop },
  { name: 'Car', icon: Car },
  { name: 'Gift', icon: Gift },
  { name: 'Headphones', icon: Headphones },
  { name: 'Plane', icon: Plane },
  { name: 'Savings', icon: PiggyBank },
  { name: 'Education', icon: BookOpen },
];

interface AddGoalDialogProps {
    onAddGoal: (newGoal: Omit<Goal, 'id' | 'savedAmount' | 'color'>) => void;
    children?: React.ReactNode;
}

export function AddGoalDialog({ onAddGoal, children }: AddGoalDialogProps) {
  const [open, setOpen] = useState(false);
  const [goalName, setGoalName] = useState('');
  const [targetAmount, setTargetAmount] = useState('');
  const [deadline, setDeadline] = useState<Date>();
  const [selectedIcon, setSelectedIcon] = useState<LucideIcon>(() => Laptop);
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!goalName || !targetAmount || !deadline) {
      toast({
        variant: 'destructive',
        title: 'Missing Information',
        description: 'Please fill out all fields to create a goal.',
      });
      return;
    }

    onAddGoal({
      name: goalName,
      targetAmount: parseFloat(targetAmount),
      deadline: deadline.toISOString(),
      icon: selectedIcon,
    });

    // Reset form and close dialog
    setGoalName('');
    setTargetAmount('');
    setDeadline(undefined);
    setSelectedIcon(() => Laptop);
    setOpen(false);
  };
  
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children || (
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add New Goal
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create a New Savings Goal</DialogTitle>
          <DialogDescription>
            What are you saving for? Let's make a plan.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="goal-name" className="text-right">
                  Goal Name
                </Label>
                <Input
                  id="goal-name"
                  value={goalName}
                  onChange={(e) => setGoalName(e.target.value)}
                  placeholder="e.g., New Laptop"
                  className="col-span-3"
                  required
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="target-amount" className="text-right">
                  Target (₹)
                </Label>
                <Input
                  id="target-amount"
                  type="number"
                  value={targetAmount}
                  onChange={(e) => setTargetAmount(e.target.value)}
                  placeholder="e.g., 50000"
                  className="col-span-3"
                  required
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="deadline" className="text-right">
                  Deadline
                </Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={'outline'}
                      className={cn(
                        'col-span-3 justify-start text-left font-normal',
                        !deadline && 'text-muted-foreground'
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {deadline ? format(deadline, 'PPP') : <span>Pick a date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={deadline}
                      onSelect={setDeadline}
                      initialFocus
                      disabled={(date) => date < new Date()}
                    />
                  </PopoverContent>
                </Popover>
              </div>
              <div className="grid grid-cols-4 items-start gap-4">
                 <Label className="text-right pt-2">
                  Icon
                </Label>
                <div className="col-span-3 flex flex-wrap gap-2">
                    {goalIcons.map(({name, icon: Icon}) => {
                        const isSelected = selectedIcon === Icon;
                        return (
                             <Button
                                key={name}
                                type="button"
                                variant={isSelected ? 'default' : 'outline'}
                                size="icon"
                                onClick={() => setSelectedIcon(() => Icon)}
                                aria-label={name}
                                className="h-12 w-12"
                            >
                                <Icon className="h-6 w-6" />
                            </Button>
                        )
                    })}
                </div>
              </div>
            </div>
            <DialogFooter>
                <DialogClose asChild>
                     <Button type="button" variant="ghost">Cancel</Button>
                </DialogClose>
                <Button type="submit">Create Goal</Button>
            </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
