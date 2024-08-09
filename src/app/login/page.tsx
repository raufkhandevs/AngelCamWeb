'use client';
import { useEffect, useState } from 'react';
import { fetchUserData } from '@/lib/shared-camera-apis';
import { User } from '@/types';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';

export default function Login() {
  const [accessToken, setAccessToken] = useState<string>('');
  const [userData, setUserData] = useState<User | null>();
  const [error, setError] = useState<string>();
  const [loading, setLoading] = useState<boolean>();

  const route = useRouter();

  const fetchUser = async (accessToken: string) => {
    try {
      setLoading(true);
      const userDataResponse = await fetchUserData(accessToken);
      setUserData(userDataResponse);
      localStorage.setItem(`${userDataResponse?.id}`, accessToken);
      setLoading(false);
    } catch (error: any) {
      console.error('Error fetching user data:', error);
      setError('not authenticated');
      setLoading(false);
    }
  };

  const handleLogin = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    fetchUser(accessToken);
  };

  useEffect(() => {
    if (userData && userData.first_name) {
      route.push('/dashboard');
    }
  }, [route, userData]);

  return (
    <div className='flex items-center justify-center min-h-screen bg-gray-100'>
      <div className='w-full max-w-md bg-white p-8 rounded-lg shadow-md'>
        <h1 className='text-2xl font-bold mb-4 text-black w-full text-center'>
          Login
        </h1>
        <form onSubmit={handleLogin} className='space-y-4'>
          <div>
            <label
              htmlFor='accessToken'
              className='block text-sm font-medium text-gray-700'
            >
              Access Token
            </label>
            <input
              id='accessToken'
              type='text'
              value={accessToken}
              onChange={(e) => setAccessToken(e.target.value)}
              className='mt-1 text-black block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
              required
            />
          </div>
          <Button title={loading ? 'Authenticating' : 'Authenticate'} />
        </form>
        {error && (
          <p className='mt-4 text-red-500 w-full text-center text-sm'>
            {error}
          </p>
        )}
      </div>
    </div>
  );
}
