
'use client';

import { user } from "@/lib/data";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { User as UserIcon, Edit, Wallet, Bell, Palette, Moon, Sun, Laptop } from "lucide-react";
import { Slider } from "@/components/ui/slider";
import { useState } from "react";
import { Switch } from "@/components/ui/switch";
import Link from "next/link";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";

export default function ProfilePage() {
    const [budget, setBudget] = useState(15000);
    const { theme, setTheme } = useTheme();

  return (
    <div className="flex flex-col items-center gap-8">
      <div className="flex flex-col items-center gap-4 animate-fade-in-up">
        <div className="relative group transition-transform hover:scale-105">
            <Avatar className="h-24 w-24 md:h-32 md:w-32 border-4 border-primary ring-4 ring-primary/20">
                <AvatarImage src={user.avatarUrl} alt={`@${user.name}`} />
                <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <Button variant="outline" size="icon" className="absolute bottom-1 right-1 h-8 w-8 md:h-9 md:w-9 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                <Edit className="w-4 h-4"/>
                <span className="sr-only">Edit profile picture</span>
            </Button>
        </div>
        <div className="text-center">
            <h1 className="text-xl md:text-2xl font-bold">{user.name}</h1>
            <p className="text-sm md:text-base text-muted-foreground">{user.college}</p>
        </div>
      </div>

      <Card className="w-full max-w-2xl animate-fade-in-up" style={{animationDelay: '0.2s'}}>
        <CardContent className="p-6 space-y-8">
            {/* Personal Information Section */}
            <div className="space-y-4">
                <h3 className="flex items-center gap-2 text-lg md:text-xl font-bold border-b pb-2">
                    <UserIcon className="w-5 h-5"/>
                    Personal Information
                </h3>
                <div className="grid md:grid-cols-2 gap-4 md:gap-6">
                    <div className="space-y-2">
                        <Label htmlFor="name" className="text-sm">Full Name</Label>
                        <Input id="name" defaultValue={user.name} />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="college" className="text-sm">College</Label>
                        <Input id="college" defaultValue={user.college} />
                    </div>
                     <div className="space-y-2 md:col-span-2">
                        <Label htmlFor="email" className="text-sm">Email</Label>
                        <Input id="email" type="email" defaultValue="student@example.com" disabled />
                    </div>
                </div>
            </div>

            {/* Budget Settings Section */}
            <div className="space-y-4">
                 <h3 className="flex items-center gap-2 text-lg md:text-xl font-bold border-b pb-2">
                    <Wallet className="w-5 h-5"/>
                    Budget Settings
                </h3>
                <div className="space-y-2">
                    <div className="flex justify-between items-center">
                        <Label htmlFor="budget" className="text-sm">Default Monthly Budget</Label>
                        <span className="font-bold text-base md:text-lg text-primary">₹{budget.toLocaleString()}</span>
                    </div>
                    <Slider
                        id="budget"
                        min={5000}
                        max={50000}
                        step={1000}
                        value={[budget]}
                        onValueChange={(value) => setBudget(value[0])}
                        aria-label="Default Monthly Budget"
                    />
                </div>
            </div>
            
             {/* Preferences Section */}
            <div className="space-y-4">
                <h3 className="flex items-center gap-2 text-lg md:text-xl font-bold border-b pb-2">
                    <Bell className="w-5 h-5"/>
                    Preferences
                </h3>
                 <div className="flex items-center justify-between rounded-lg border p-3 md:p-4">
                    <div>
                        <h4 className="font-medium text-sm md:text-base" id="notifications-label">Notifications</h4>
                        <p className="text-xs md:text-sm text-muted-foreground">Receive alerts for budget limits and tips.</p>
                    </div>
                    <Switch defaultChecked aria-labelledby="notifications-label" />
                </div>

                <div className="flex items-center justify-between rounded-lg border p-3 md:p-4">
                    <div>
                        <h4 className="font-medium text-sm md:text-base" id="theme-label">Theme</h4>
                        <p className="text-xs md:text-sm text-muted-foreground">Choose your preferred app appearance.</p>
                    </div>
                    <div className="flex items-center gap-1 sm:gap-2">
                        <Button variant={theme === 'light' ? 'default' : 'outline'} size="icon" className="h-8 w-8 sm:h-9 sm:w-9" onClick={() => setTheme('light')}>
                            <Sun className="h-4 w-4 sm:h-5 sm:w-5" />
                        </Button>
                         <Button variant={theme === 'dark' ? 'default' : 'outline'} size="icon" className="h-8 w-8 sm:h-9 sm:w-9" onClick={() => setTheme('dark')}>
                            <Moon className="h-4 w-4 sm:h-5 sm:w-5" />
                        </Button>
                         <Button variant={theme === 'system' ? 'default' : 'outline'} size="icon" className="h-8 w-8 sm:h-9 sm:w-9" onClick={() => setTheme('system')}>
                            <Laptop className="h-4 w-4 sm:h-5 sm:w-5" />
                        </Button>
                    </div>
                </div>
            </div>

             <Button size="lg" className="w-full">Save Changes</Button>
        </CardContent>
      </Card>
      
      <div className="flex flex-col items-center gap-2 animate-fade-in-up" style={{animationDelay: '0.4s'}}>
        <Button variant="outline" className="w-48 border-destructive text-destructive hover:bg-destructive/10 hover:text-destructive" asChild>
            <Link href="/">Log Out</Link>
        </Button>
        <Button variant="link" className="text-muted-foreground text-xs h-auto py-1">Delete Account</Button>
      </div>

    </div>
  );
}
