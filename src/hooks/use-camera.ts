import { getListOfSharedCameras } from '@/lib/shared-camera-apis'
import { useQuery } from '@tanstack/react-query'

const useCamera = () => {
    const { data: getListOfSharedCameraList, isLoading: isCameraListLoading} = useQuery({
        queryKey: ['GetSharedCamera'],
        queryFn: async () => {
            try{
                const sharedCameraList = await getListOfSharedCameras();
                return sharedCameraList.results;
            }catch(err){
                console.log('getListOfSharedCameras', err)
            }
        },
      }) 
      return {
        getListOfSharedCameraList,
        isCameraListLoading
     }
}
 
export {useCamera}