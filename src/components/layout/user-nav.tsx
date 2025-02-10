import { signOut } from "next-auth/react";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { LogOut, Settings, User } from "lucide-react";

export function UserNav({ user }: { user: any }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-9 w-9 rounded-full">
          <Avatar className="h-9 w-9">
            <AvatarImage src={user?.image || ""} />
            <AvatarFallback>{user?.name?.[0]}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-56 space-y-1 bg-popover shadow-lg border rounded-md"
        align="end"
        sideOffset={8}
      >
        <DropdownMenuItem
          className="flex items-center cursor-pointer hover:bg-muted focus:bg-muted px-3 py-2"
        >
          <User className="mr-2 h-4 w-4" />
          Profile
        </DropdownMenuItem>
        <DropdownMenuItem
          className="flex items-center cursor-pointer hover:bg-muted focus:bg-muted px-3 py-2"
        >
          <Settings className="mr-2 h-4 w-4" />
          Settings
        </DropdownMenuItem>
        <DropdownMenuSeparator className="bg-border" />
        <DropdownMenuItem
          onClick={() => signOut({ callbackUrl: "/" })}
          className="flex items-center cursor-pointer bg-destructive hover:bg-destructive/90 focus:bg-destructive/90 text-destructive-foreground px-3 py-2 rounded-sm mt-1"
        >
          <LogOut className="mr-2 h-4 w-4" />
          Sign out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
