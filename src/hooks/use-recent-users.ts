import { useState, useEffect } from 'react';

interface RecentUser {
  id: string;
  name: string;
  image: string | null;
  createdAt: string;
}

export function useRecentUsers() {
  const [recentUsers, setRecentUsers] = useState<RecentUser[]>([]);
  const [isLoadingUsers, setIsLoadingUsers] = useState(true);

  useEffect(() => {
    async function fetchRecentUsers() {
      try {
        const response = await fetch('/api/users/recent');
        const data = await response.json();
        setRecentUsers(data.users);
      } catch (error) {
        console.error('Error fetching recent users:', error);
      } finally {
        setIsLoadingUsers(false);
      }
    }

    fetchRecentUsers();
  }, []);

  return { recentUsers, isLoadingUsers };
}
