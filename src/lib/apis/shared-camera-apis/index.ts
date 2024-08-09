import { baseUrl } from '@/lib/envs';
import { CameraResponse, User } from '@/types';
 
/**
 * get list of shared list camera
 *
 * @async
 * @param {string} accessToken
 * @returns {unknown}
 */
export const getListOfSharedCameras = async (accessToken: string) => {
    const response = await fetch(
        `${baseUrl}/shared-cameras/`,
            {
                headers: {
                  Authorization:
                    `PersonalAccessToken ${accessToken}`,
                },
            }
            );
    const cameraList: CameraResponse = await response.json();
    return cameraList
} 

/**
 * Get user data
 *
 * @async
 * @param {string} accessToken
 * @returns {Promise<User | null>}
 */
export const fetchUserData = async (accessToken: string): Promise<User | null> => {
    try {
      const response = await fetch(`${baseUrl}/me/`, {
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
        
    
