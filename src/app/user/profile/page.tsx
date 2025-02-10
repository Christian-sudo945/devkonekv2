"use client";

import React, { useState, useEffect } from 'react';
import { User, Shield, Upload, Settings, Sun, Moon, Check, X, Mail, Phone, Menu, X as Close } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { useSession } from 'next-auth/react';

const Logo = () => (
  <svg viewBox="0 0 200 50" className="h-8 w-32">
    <rect x="5" y="10" width="30" height="30" fill="currentColor" className="text-blue-600 dark:text-blue-400" rx="2"/>
    <rect x="8" y="13" width="24" height="24" fill="currentColor" className="text-blue-700 dark:text-blue-500" rx="1"/>
    <g fill="currentColor" className="text-blue-200 dark:text-blue-300">
      {[16, 20, 24, 28].map(y => 
        [11, 15, 19, 23].map(x => (
          <rect key={`${x}-${y}`} x={x} y={y} width="2" height="2"/>
        ))
      )}
    </g>
    <text x="50" y="33" fontFamily="Arial" fontWeight="bold" fontSize="24" fill="currentColor" className="text-blue-600 dark:text-blue-400">DevKonek</text>
  </svg>
);

interface UserData {
  name: string;
  role: string;
  image: string;
  email: string;
  username: string;
  ipAddress: string;
  bio: string;
  phone: string;
  isVerified: boolean;
}

type SectionKey = 'profile' | 'verification' | 'documents' | 'security';

interface Section {
  title: string;
  icon: React.ComponentType<{ className?: string }>;
  component: React.ComponentType<{ userData?: UserData }>;
}

const ProfileSection = ({ userData }: { userData?: UserData }) => (
  <Card className="w-full shadow-lg">
    <CardHeader className="pb-4">
      <CardTitle>Profile Information</CardTitle>
    </CardHeader>
    <CardContent className="p-4 lg:p-6">
      <div className="flex flex-col lg:flex-row items-start lg:items-center gap-6">
        <div className="relative w-full lg:w-auto flex justify-center lg:justify-start">
          <div className="h-24 w-24 rounded-full overflow-hidden bg-gray-200 dark:bg-gray-700 ring-4 ring-white dark:ring-gray-800">
            <img src={userData?.image || "/api/avatar.jpg"} alt="Profile" className="h-full w-full object-cover" />
          </div>
          <Badge className="absolute -bottom-2 right-1/2 lg:right-0 translate-x-1/2 lg:translate-x-0" variant={userData?.isVerified ? "default" : "destructive"}>
            {userData?.isVerified ? <Check className="w-3 h-3" /> : <X className="w-3 h-3" />}
          </Badge>
        </div>
        <div className="flex-1 min-w-0 space-y-4 w-full">
          <div className="text-center lg:text-left">
            <h3 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">{userData?.name}</h3>
            <p className="text-gray-500 dark:text-gray-400">{userData?.role}</p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <Input value={userData?.email} readOnly className="bg-gray-50 dark:bg-gray-800" />
            <Input value={userData?.username} readOnly className="bg-gray-50 dark:bg-gray-800" />
            <Input value={userData?.bio} readOnly className="bg-gray-50 dark:bg-gray-800 lg:col-span-2" />
            <Input value={userData?.phone} readOnly className="bg-gray-50 dark:bg-gray-800 lg:col-span-2" />
          </div>
        </div>
      </div>
    </CardContent>
  </Card>
);

const VerificationSection = ({ userData }: { userData?: UserData }) => (
  <Card className="shadow-lg">
    <CardHeader className="pb-4">
      <CardTitle>Account Verification</CardTitle>
    </CardHeader>
    <CardContent className="p-4 lg:p-6 space-y-6">
      <Alert className="bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800">
        <AlertDescription className="text-blue-800 dark:text-blue-200">
          Complete verification to unlock all features
        </AlertDescription>
      </Alert>
      <div className="space-y-4">
        {[
          { icon: Mail, title: "Email", value: userData?.email, status: "Verified", color: "text-green-500" },
          { icon: Phone, title: "Phone", value: userData?.phone, status: "Pending", color: "text-yellow-500" },
          { icon: Shield, title: "ID", value: "Government ID", status: "Required", color: "text-gray-500" }
        ].map((item, index) => (
          <div key={index} className="flex flex-col lg:flex-row items-start lg:items-center justify-between p-4 rounded-lg border dark:border-gray-700 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors gap-4">
            <div className="flex items-center gap-4 w-full lg:w-auto">
              <item.icon className={`w-5 h-5 ${item.color}`} />
              <div>
                <p className="font-medium">{item.title}</p>
                <p className="text-sm text-gray-500">{item.value}</p>
              </div>
            </div>
            <Button size="sm" variant={item.status === "Verified" ? "outline" : "default"} className="w-full lg:w-auto">
              {item.status}
            </Button>
          </div>
        ))}
      </div>
    </CardContent>
  </Card>
);

const SecuritySection = () => {
  const [formData, setFormData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  return (
    <Card className="shadow-lg">
      <CardHeader className="pb-4">
        <CardTitle>Security Settings</CardTitle>
      </CardHeader>
      <CardContent className="p-4 lg:p-6 space-y-6">
        <div className="space-y-4">
          {Object.entries(formData).map(([key, value]) => (
            <div key={key} className="space-y-2">
              <label className="text-sm font-medium capitalize">
                {key.replace(/([A-Z])/g, ' $1').trim()}
              </label>
              <Input
                type="password"
                value={value}
                onChange={(e) => setFormData(prev => ({ ...prev, [key]: e.target.value }))}
                className="bg-gray-50 dark:bg-gray-800"
              />
            </div>
          ))}
          <Button className="w-full" disabled={!Object.values(formData).every(Boolean)}>
            Update Password
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

const DocumentUploadSection = () => (
  <Card className="shadow-lg">
    <CardHeader className="pb-4">
      <CardTitle>Document Upload</CardTitle>
    </CardHeader>
    <CardContent className="p-4 lg:p-6 space-y-6">
      <Alert className="bg-blue-50 dark:bg-blue-900/20">
        <AlertDescription>
          Upload a valid government-issued ID for verification
        </AlertDescription>
      </Alert>
      <div className="border-2 border-dashed rounded-lg p-4 lg:p-8 text-center bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700/50 transition-colors cursor-pointer">
        <Upload className="mx-auto h-12 w-12 text-gray-400" />
        <div className="mt-4">
          <Button className="w-full sm:w-auto">Choose File</Button>
          <p className="mt-2 text-sm text-gray-500">PNG, JPG up to 10MB</p>
        </div>
      </div>
    </CardContent>
  </Card>
);

const DashboardPage = () => {
  const { data: session, status } = useSession();
  const [darkMode, setDarkMode] = useState(false);
  const [activeSection, setActiveSection] = useState<SectionKey>('profile');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const isDark = localStorage.getItem('darkMode') === 'true';
    setDarkMode(isDark);
    document.documentElement.classList.toggle('dark', isDark);
    
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleDarkMode = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    localStorage.setItem('darkMode', String(newDarkMode));
    document.documentElement.classList.toggle('dark', newDarkMode);
  };

  const sections: Record<SectionKey, Section> = {
    profile: { title: 'Profile', icon: User, component: ProfileSection },
    verification: { title: 'Verification', icon: Shield, component: VerificationSection },
    documents: { title: 'Documents', icon: Upload, component: DocumentUploadSection },
    security: { title: 'Security', icon: Settings, component: SecuritySection },
  };

  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 dark:border-white" />
      </div>
    );
  }

  const userData = session?.user as UserData;

  const SidebarContent = () => (
    <nav className="p-4 space-y-2">
      {(Object.entries(sections) as [SectionKey, Section][]).map(([sectionKey, section]) => (
        <Button
          key={sectionKey}
          onClick={() => {
            setActiveSection(sectionKey);
            setIsMobileMenuOpen(false);
          }}
          variant={activeSection === sectionKey ? 'default' : 'ghost'}
          className="w-full justify-start"
        >
          <section.icon className="mr-2 h-5 w-5" />
          {section.title}
        </Button>
      ))}
    </nav>
  );

  const ActiveComponent = sections[activeSection].component;

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <header className="fixed top-0 left-0 right-0 z-50 bg-white dark:bg-gray-900 border-b shadow-sm">
        <div className="px-4 h-16 flex items-center justify-between max-w-7xl mx-auto">
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <Close className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
            <Logo />
          </div>
          <Button variant="ghost" size="icon" onClick={toggleDarkMode}>
            {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </Button>
        </div>
      </header>

      <div className="pt-16 lg:pl-64 min-h-screen">
        <aside className={`fixed left-0 top-16 h-[calc(100vh-4rem)] w-64 bg-white dark:bg-gray-900 border-r transform transition-transform duration-200 ease-in-out lg:transform-none z-40 ${
          isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}>
          <SidebarContent />
        </aside>

        {isMobileMenuOpen && (
          <div
            className="fixed inset-0 bg-black/50 z-30 lg:hidden"
            onClick={() => setIsMobileMenuOpen(false)}
          />
        )}

        <main className="p-4 lg:p-8">
          <div className="max-w-5xl mx-auto">
            <ActiveComponent userData={userData} />
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardPage;