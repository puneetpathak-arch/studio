
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Smartphone, UserPlus, LogIn, Mail } from 'lucide-react';

export function LoginSignupDialog({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const { toast } = useToast();
  const router = useRouter();

  const handleAuthAction = () => {
    toast({
      title: 'Success!',
      description: "You've been logged in.",
    });
    setOpen(false);
    router.push('/dashboard');
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader className="text-center">
          <DialogTitle className="text-2xl font-bold">Welcome to EduFinance</DialogTitle>
          <DialogDescription>
            Log in or create an account to manage your finances.
          </DialogDescription>
        </DialogHeader>
        <Tabs defaultValue="login" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="login">
              <LogIn className="mr-2 h-4 w-4" />
              Log In
            </TabsTrigger>
            <TabsTrigger value="signup">
              <UserPlus className="mr-2 h-4 w-4" />
              Sign Up
            </TabsTrigger>
          </TabsList>
          <TabsContent value="login">
            <div className="space-y-4 py-4">
                <div className="space-y-2">
                    <Label htmlFor="phone-login">Phone Number</Label>
                    <div className="relative">
                        <Smartphone className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                        <Input id="phone-login" type="tel" placeholder="+91 98765 43210" className="pl-10" />
                    </div>
                </div>
                <Button onClick={handleAuthAction} className="w-full">Send OTP</Button>
            </div>
          </TabsContent>
          <TabsContent value="signup">
            <div className="space-y-4 py-4">
                <div className="space-y-2">
                    <Label htmlFor="name-signup">Full Name</Label>
                     <Input id="name-signup" placeholder="Rohan Sharma" />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="phone-signup">Phone Number</Label>
                    <div className="relative">
                        <Smartphone className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                        <Input id="phone-signup" type="tel" placeholder="+91 98765 43210" className="pl-10" />
                    </div>
                </div>
                <Button onClick={handleAuthAction} className="w-full">Create Account</Button>
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}

    