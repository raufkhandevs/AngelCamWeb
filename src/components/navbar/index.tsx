'use client';
import { useRouter } from 'next/navigation';

const Header = () => {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      localStorage.removeItem('accessToken');
      router.push('/login');
    } catch (error) {
      console.error('Logout failed', error);
    }
  };

  return (
    <header className='bg-white text-black shadow-lg font-light p-4'>
      <div className='container mx-auto flex justify-between gap-2 items-center'>
        <h1 className='text-2xl font-light text-right'>Angel Cam</h1>
        <button
          onClick={handleLogout}
          className='text-lg font-medium border-indigo-600 border-2 rounded-md hover:bg-indigo-600 hover:text-white p-2'
        >
          Logout
        </button>
      </div>
    </header>
  );
};

export default Header;
