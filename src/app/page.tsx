import Link from 'next/link';
import { PiggyBank } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function LoginPage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-background">
      <Card className="w-full max-w-md mx-4 shadow-2xl">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <PiggyBank className="w-12 h-12 text-primary" />
          </div>
          <CardTitle className="text-3xl font-headline">EduFinance</CardTitle>
          <CardDescription>Your personal guide to financial wellness in college.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="student@college.edu" disabled />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" placeholder="••••••••" disabled />
            </div>
            <Button asChild className="w-full" size="lg">
              <Link href="/dashboard">Login to Demo</Link>
            </Button>
          </div>
          <p className="mt-4 text-xs text-center text-muted-foreground">
            This is a demo application. Login is disabled.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
