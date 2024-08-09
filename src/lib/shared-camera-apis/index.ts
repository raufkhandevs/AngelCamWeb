import { CameraResponse, User } from '@/types';
 
export const getListOfSharedCameras = async () => {
    const response = await fetch(
        'https://api.angelcam.com/v1/shared-cameras/',
            {
                headers: {
                  Authorization:
                    'PersonalAccessToken 584f9f7330573c4a3717ea7aa1f97d884d39ac8d',
                },
            }
            );
    const cameraList: CameraResponse = await response.json();
    return cameraList
} 

export const fetchUserData = async (accessToken: string): Promise<User | null> => {
    try {
      const response = await fetch('https://api.angelcam.com/v1/me/', {
        headers: {
          'Authorization': `PersonalAccessToken ${accessToken}`,
          'Accept': 'application/json',
        },
      });

      if (!response.ok) {
        const errorResponse = await response.json();
        if (errorResponse.title === 'not_authenticated' && response.status === 401) {
          return null;
        }
        
        throw new Error(errorResponse.detail || 'An error occurred');
      }
  
      const userData: User = await response.json();
      return userData;
  
    } catch (error) {
      console.error('Error fetching user data:', error);
      throw error;
    }
  };
        
    
