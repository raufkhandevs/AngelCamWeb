import CameraGrid from '@/components/camera-list';
import Header from '@/components/navbar';
import Head from 'next/head';

const Dashboard = () => {
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
          <CameraGrid />
        </div>
      </main>
    </>
  );
};

export default Dashboard;
