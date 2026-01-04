import { user } from "@/lib/data";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { User as UserIcon, Edit } from "lucide-react";

export default function ProfilePage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold font-headline flex items-center gap-2">
            <UserIcon className="w-8 h-8"/>
            Profile
        </h1>
        <p className="text-muted-foreground">Manage your account settings.</p>
      </div>

      <Card>
        <CardHeader>
            <div className="flex items-center justify-between">
                <CardTitle>User Information</CardTitle>
                <Button variant="ghost" size="icon">
                    <Edit className="w-4 h-4" />
                </Button>
            </div>
            <CardDescription>View and edit your personal details.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
            <div className="flex items-center gap-4">
                <Avatar className="h-20 w-20">
                    <AvatarImage src={user.avatarUrl} alt={`@${user.name}`} />
                    <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                    <h2 className="text-2xl font-bold">{user.name}</h2>
                    <p className="text-muted-foreground">{user.college}</p>
                </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input id="name" defaultValue={user.name} />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="college">College</Label>
                    <Input id="college" defaultValue={user.college} />
                </div>
                 <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" defaultValue="rohan.sharma@iitd.ac.in" disabled />
                </div>
                 <div className="space-y-2">
                    <Label htmlFor="budget">Default Monthly Budget</Label>
                    <Input id="budget" type="number" defaultValue="15000" />
                </div>
            </div>
             <Button>Save Changes</Button>
        </CardContent>
      </Card>
    </div>
  );
}
