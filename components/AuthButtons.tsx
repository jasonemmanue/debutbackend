// components/AuthButtons.tsx

"use client";

import Link from "next/link";
import Image from "next/image";
import { useSession, signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { LogOut, Settings } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";
import { useState, useEffect } from "react";
import { Skeleton } from "@/components/ui/skeleton";

export function AuthButtons() {
  const { data: session, status } = useSession();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted || status === "loading") {
    return (
      <div className="flex items-center space-x-3 h-10">
        <Skeleton className="h-9 w-24" />
        <Skeleton className="h-9 w-24" />
      </div>
    );
  }

  if (status === "authenticated") {
    const user = session.user;
    const isCompany = user?.type === 'entreprise' || user?.type === 'employe';
    const dashboardUrl = isCompany ? "/company" : "/client/profile";

    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Avatar className="h-10 w-10 cursor-pointer">
            <AvatarImage src={user?.image || ''} alt={user?.name || 'User Avatar'} />
            <AvatarFallback className="bg-blue-300 text-white font-semibold">
              {user?.name?.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56" align="end" forceMount>
          <DropdownMenuLabel className="font-normal">
            <div className="flex flex-col space-y-1">
              <p className="text-sm font-medium leading-none">
                {user?.name}
              </p>
              <p className="text-xs leading-none text-muted-foreground">
                {user?.email}
              </p>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem asChild>
             <Link href={dashboardUrl}>
                <Settings className="mr-2 h-4 w-4" />
                <span>{isCompany ? "Dashboard Entreprise" : "Mon Profil"}</span>
             </Link>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => signOut({ callbackUrl: '/' })}>
            <LogOut className="mr-2 h-4 w-4" />
            <span>Se déconnecter</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }

  return (
    <div className="flex items-center space-x-3">
      <Button asChild variant="ghost" className="text-gray-600 hover:text-rose-600">
        <Link href="/auth/login">Se connecter</Link>
      </Button>
      <Button asChild className="bg-gradient-to-r from-rose-500 to-purple-500 hover:from-rose-600 hover:to-purple-600 text-white shadow-lg">
        <Link href="/auth/register">S'inscrire</Link>
      </Button>
    </div>
  );
}