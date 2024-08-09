'use client';
import { useState } from 'react';
import Image from 'next/image';
import { Camera } from '@/types';
import { Dialog, DialogBackdrop } from '@headlessui/react';
import { useCamera } from '@/hooks/use-camera';

const CameraGrid = () => {
  const [selectedCamera, setSelectedCamera] = useState<Camera | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const { getListOfSharedCameraList } = useCamera();

  const openModal = (camera: Camera) => {
    setSelectedCamera(camera);
    setIsModalOpen(true);
    setLoading(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedCamera(null);
    setLoading(false);
  };

  return (
    <div className='bg-gray-100'>
      <h1 className='text-2xl ml-4 text-left w-full text-black font-medium'>
        My Shared Camera
      </h1>

      <div className='p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
        {getListOfSharedCameraList?.map((camera: Camera) => (
          <div
            key={camera.id}
            className='bg-white rounded-lg shadow-md overflow-hidden transform transition-transform duration-300 ease-in-out hover:scale-105 hover:shadow-lg cursor-pointer'
            onClick={() => openModal(camera)}
          >
            <Image
              src={camera.live_snapshot}
              alt={camera.name}
              width={400}
              height={300}
              className='w-full h-40 object-cover'
            />
            <div className='p-4'>
              <h2 className='font-semibold text-black text-center'>
                {camera.name}
              </h2>
            </div>
          </div>
        ))}
      </div>

      {selectedCamera && (
        <Dialog
          open={isModalOpen}
          onClose={closeModal}
          className='fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75'
        >
          <DialogBackdrop className='fixed inset-0 bg-black/30' />
          <div className='relative w-full max-w-3xl p-4 bg-white rounded-lg'>
            {!loading && (
              <div className='w-full flex justify-end'>
                <button
                  type='button'
                  className=' text-white bg-indigo-600 shadow-md shadow-indigo-300 mb-4 rounded-full py-1 px-[10px]'
                  onClick={closeModal}
                >
                  <span>&times;</span>
                </button>
              </div>
            )}
            <div className='aspect-w-16 aspect-h-9 shadow-md shadow-black rounded-lg'>
              {loading && (
                <div className=' inset-0 z-40 flex flex-col gap-2 items-center justify-center bg-black bg-opacity-50 rounded-lg py-5'>
                  <div className='w-16 h-16 border-4 border-t-4 border-white border-solid rounded-full animate-spin'></div>
                  <p>Loading</p>
                </div>
              )}
              {selectedCamera.streams.some(
                (stream) => stream.format === 'mjpeg'
              ) ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={
                    selectedCamera.streams.find(
                      (stream) => stream.format === 'mjpeg'
                    )?.url || ''
                  }
                  alt={`MJPEG stream for ${selectedCamera.name}`}
                  className='w-full h-full object-cover rounded-lg'
                  style={{ display: 'block' }}
                  onLoad={() => setLoading(false)}
                />
              ) : (
                <video
                  className='w-full h-full object-cover rounded-lg'
                  onCanPlay={() => setLoading(false)}
                  controls
                  preload='auto'
                >
                  {selectedCamera.streams.map((stream) => (
                    <source
                      key={stream.url}
                      src={stream.url}
                      type={`video/${stream.format}`}
                    />
                  ))}
                </video>
              )}
            </div>
            {!loading && (
              <div className='mt-4'>
                <h2 className='text-lg font-semibold text-black p-2'>
                  {selectedCamera.name}
                </h2>
              </div>
            )}
          </div>
        </Dialog>
      )}
    </div>
  );
};

export default CameraGrid;
