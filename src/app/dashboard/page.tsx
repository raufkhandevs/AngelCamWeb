'use client';

import CameraGrid from '@/components/camera-list';
import Header from '@/components/layouts/navbar';
import { useCamera } from '@/hooks/use-camera';
import Head from 'next/head';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const Dashboard = () => {
  const { getListOfSharedCameraList, isLoadingToken, accessToken } =
    useCamera();

  const router = useRouter();

  useEffect(() => {
    if (!accessToken && !isLoadingToken) {
      router.push('/login');
    }
  }, [accessToken, router]);

  return (
    <>
      <Head>
        <title>Angel Cam</title>
        <meta name='description' content='A grid view of cameras' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <main className='min-h-screen bg-gray-100'>
        <Header />
        <div className='p-8'>
          <CameraGrid
            cameraList={getListOfSharedCameraList}
            isLoading={isLoadingToken}
          />
        </div>
      </main>
    </>
  );
};

export default Dashboard;
