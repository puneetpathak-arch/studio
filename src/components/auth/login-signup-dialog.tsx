
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
import { UserPlus, LogIn, Mail, KeyRound } from 'lucide-react';

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
                    <Label htmlFor="email-login">Email</Label>
                    <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                        <Input id="email-login" type="email" placeholder="student@example.com" className="pl-10" />
                    </div>
                </div>
                 <div className="space-y-2">
                    <Label htmlFor="password-login">Password</Label>
                    <div className="relative">
                        <KeyRound className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                        <Input id="password-login" type="password" placeholder="••••••••" className="pl-10" />
                    </div>
                </div>
                <Button onClick={handleAuthAction} className="w-full">Log In</Button>
            </div>
          </TabsContent>
          <TabsContent value="signup">
            <div className="space-y-4 py-4">
                <div className="space-y-2">
                    <Label htmlFor="name-signup">Full Name</Label>
                     <Input id="name-signup" placeholder="Rohan Sharma" />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="email-signup">Email</Label>
                    <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                        <Input id="email-signup" type="email" placeholder="student@example.com" className="pl-10" />
                    </div>
                </div>
                 <div className="space-y-2">
                    <Label htmlFor="password-signup">Password</Label>
                    <div className="relative">
                        <KeyRound className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                        <Input id="password-signup" type="password" placeholder="••••••••" className="pl-10" />
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
