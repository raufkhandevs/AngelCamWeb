import React from 'react';
import { Dialog } from '@headlessui/react';
import { CameraModalProps } from '@/types';

const CameraModal: React.FC<CameraModalProps> = ({
  isOpen,
  onClose,
  selectedCamera,
  loading,
  setLoading,
}) => {
  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      className='fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75'
    >
      <div className='relative w-full max-w-3xl p-4 bg-white rounded-lg'>
        {!loading && (
          <div className='w-full flex justify-end'>
            <button
              type='button'
              className='text-white bg-indigo-600 shadow-md shadow-indigo-300 mb-4 rounded-full py-1 px-[10px]'
              onClick={onClose}
            >
              <span>&times;</span>
            </button>
          </div>
        )}
        <div className='aspect-w-16 aspect-h-9 shadow-md shadow-black rounded-lg'>
          {loading && (
            <div className='inset-0 z-40 flex flex-col gap-2 items-center justify-center bg-black bg-opacity-50 rounded-lg py-5'>
              <div className='w-16 h-16 border-4 border-t-4 border-white border-solid rounded-full animate-spin'></div>
              <p>Loading</p>
            </div>
          )}
          {selectedCamera &&
          selectedCamera.streams.some((stream) => stream.format === 'mjpeg') ? (
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
              {selectedCamera?.streams.map((stream) => (
                <source
                  key={stream.url}
                  src={stream.url}
                  type={`video/${stream.format}`}
                />
              ))}
            </video>
          )}
        </div>
        {!loading && selectedCamera && (
          <div className='mt-4'>
            <h2 className='text-lg font-semibold text-black p-2'>
              {selectedCamera.name}
            </h2>
          </div>
        )}
      </div>
    </Dialog>
  );
};

export default CameraModal;
