
"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { user, notifications } from "@/lib/data";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { Bell, AlertTriangle, BadgePercent, Trophy } from "lucide-react";
import type { Notification } from "@/lib/types";

interface UserNavProps {
    onBudget: boolean;
}

const iconMap: { [key in Notification['type']]: React.ElementType } = {
  "budget-warning": AlertTriangle,
  "budget-over": AlertTriangle,
  "new-tip": BadgePercent,
  "goal-achieved": Trophy,
};

const colorMap: { [key in Notification['type']]: string } = {
    "budget-warning": "text-orange-500",
    "budget-over": "text-red-600",
    "new-tip": "text-blue-500",
    "goal-achieved": "text-green-600",
}


function NotificationsDropdown() {
    const unreadCount = notifications.filter(n => !n.read).length;

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-9 w-9 rounded-full">
                    <Bell className="h-5 w-5" />
                    {unreadCount > 0 && (
                        <span className="absolute top-1 right-1 flex h-3 w-3">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
                        </span>
                    )}
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-80" align="end">
                <DropdownMenuLabel>
                    <div className="flex justify-between items-center">
                        <p className="text-sm font-medium">Notifications</p>
                        {unreadCount > 0 && (
                            <span className="text-xs text-primary font-bold">{unreadCount} New</span>
                        )}
                    </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup className="max-h-96 overflow-y-auto">
                    {notifications.length > 0 ? (
                        notifications.map(notification => {
                            const Icon = iconMap[notification.type];
                            return (
                                <DropdownMenuItem key={notification.id} className="flex items-start gap-3 data-[highlighted]:bg-accent/80" style={{opacity: notification.read ? 0.6 : 1}}>
                                    <Icon className={cn("mt-1 h-5 w-5 shrink-0", colorMap[notification.type])} />
                                    <div className="flex flex-col">
                                        <p className="text-sm font-medium whitespace-normal">{notification.title}</p>
                                        <p className="text-xs text-muted-foreground whitespace-normal">{notification.description}</p>
                                    </div>
                                </DropdownMenuItem>
                            )
                        })
                    ) : (
                        <div className="py-4 text-center text-sm text-muted-foreground">
                            All caught up! 🎉
                        </div>
                    )}
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="justify-center">
                   <Link href="#" className="text-xs text-muted-foreground hover:text-primary">Mark all as read</Link>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

export function UserNav({ onBudget }: UserNavProps) {
  return (
    <div className="flex items-center gap-2">
        <NotificationsDropdown />
        <DropdownMenu>
        <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative h-8 w-8 rounded-full">
            <Avatar className={cn("h-9 w-9", onBudget && "ring-2 ring-green-500 ring-offset-2 ring-offset-background")}>
                <AvatarImage src={user.avatarUrl} alt={`@${user.name}`} />
                <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
            </Avatar>
            </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56" align="end" forceMount>
            <DropdownMenuLabel className="font-normal">
            <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium leading-none">{user.name}</p>
                <p className="text-xs leading-none text-muted-foreground">
                {user.college}
                </p>
            </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
            <DropdownMenuItem>
                <Link href="/profile" className="w-full">Profile</Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
                <Link href="/dashboard" className="w-full">Billing</Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
                <Link href="/dashboard" className="w-full">Settings</Link>
            </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
            <Link href="/" className="w-full">Log out</Link>
            </DropdownMenuItem>
        </DropdownMenuContent>
        </DropdownMenu>
    </div>
  );
}
