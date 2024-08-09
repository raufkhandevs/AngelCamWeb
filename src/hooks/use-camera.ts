import { getListOfSharedCameras } from '@/lib/apis/shared-camera-apis';
import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';


const useCamera = () => {
    const [accessToken, setAccessToken] = useState<string>('');
    const [isLoadingToken, setIsLoadingToken] = useState<boolean>(true); 

    useEffect(() => {
        const tokenFromLocalStorage = localStorage.getItem('accessToken');
        setAccessToken(tokenFromLocalStorage || '');
        setIsLoadingToken(false);
    }, []);

    const { data: getListOfSharedCameraList, isLoading: isCameraListLoading } = useQuery({
        queryKey: ['GetSharedCamera'],
        queryFn: async () => {
            if (!accessToken) return []; 
            try {
                const sharedCameraList = await getListOfSharedCameras(accessToken);
                return sharedCameraList.results;
            } catch (err) {
                console.log('getListOfSharedCameras', err);
                return []; 
            }
        },
        enabled: !isLoadingToken && !!accessToken, 
    });

    return {
        getListOfSharedCameraList,
        isCameraListLoading,
        isLoadingToken, 
    };
};

export { useCamera };