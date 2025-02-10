import React, { useState } from "react";
import { Sun, Moon, Search, User, Settings, LogOut, ChevronDown, } from "react-feather"; 
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarImage } from "@/components/ui/avatar";


const Navbar = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const toggleDarkMode = () => setDarkMode((prev) => !prev);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0">
            <span className="text-xl font-bold">Logo</span>
          </div>
          <div className="hidden md:block flex-1 max-w-md mx-4">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <Input type="text" placeholder="Search..." className="pl-10" />
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon" onClick={toggleDarkMode}>
              {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </Button>
            <div className="relative">
              <Button variant="ghost" onClick={() => setIsProfileOpen(!isProfileOpen)} className="flex items-center space-x-2">
                <Avatar>
                  <AvatarImage src="https://grallc.github.io/img/avatar.jpg" alt="Christian | Dev" />
                </Avatar>
                <span className="hidden md:block">Christian | Dev</span>
                <ChevronDown className="h-4 w-4" />
              </Button>
                <div className="py-1">
                  <Button variant="ghost" className="w-full justify-start px-4 py-2 text-sm">
                    <User className="h-4 w-4 mr-2" />Profile
                  </Button>
                  <Button variant="ghost" className="w-full justify-start px-4 py-2 text-sm">
                    <Settings className="h-4 w-4 mr-2" />Settings
                  </Button>
                  <hr className="my-1 dark:border-gray-700" />
                  <Button variant="ghost" className="w-full justify-start px-4 py-2 text-sm text-red-600 dark:text-red-400">
                    <LogOut className="h-4 w-4 mr-2" />Logout
                  </Button>
                </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
