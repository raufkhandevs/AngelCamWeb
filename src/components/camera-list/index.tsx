'use client';

import { useState } from 'react';
import { Camera } from '@/types';
import Card from './Card';
import CameraModal from '../dialogs/video-play-dialog';

const CameraGrid = (props: { cameraList?: Camera[]; isLoading?: boolean }) => {
  const { cameraList, isLoading } = props;
  const [selectedCamera, setSelectedCamera] = useState<Camera | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

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

      {isLoading ? ( // Show loading indicator if isLoading is true
        <div className='flex items-center justify-center h-64'>
          <div className='w-16 h-16 border-4 border-t-4 border-indigo-600 border-solid rounded-full animate-spin'></div>
          <p className='ml-2 text-lg text-gray-600'>Loading camera list...</p>
        </div>
      ) : (
        <div className='p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
          {cameraList?.map((camera: Camera) => (
            <Card
              key={camera.id}
              name={camera.name}
              src={camera.live_snapshot}
              onClick={() => openModal(camera)}
            />
          ))}
        </div>
      )}

      {selectedCamera && (
        <CameraModal
          isOpen={isModalOpen}
          onClose={closeModal}
          selectedCamera={selectedCamera}
          loading={loading}
          setLoading={setLoading}
        />
      )}
    </div>
  );
};

export default CameraGrid;
