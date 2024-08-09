export interface Snapshot {
  url: string;
  created_at: string;
}
 
export interface Stream {
  format: string;
  url: string;
}
  
export interface CameraOwner {
  email: string;
  first_name: string;
  last_name: string;
}
  
export interface Camera {
  id: number;
  name: string;
  type: string;
  snapshot: Snapshot;
  status: string;
  live_snapshot: string;
  streams: Stream[];
  applications: { code: string }[];
  owner: CameraOwner;
  has_recording: boolean;
  has_notifications: boolean;
  audio_enabled: boolean;
  low_latency_enabled: boolean;
}
  
export interface CameraResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Camera[];
}

export interface User {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  root_site: number;
  my_cameras_count: number;
  shared_cameras_count: number;
  total_cameras_count: number;
  cameras_with_guests_count: number;
  require_qualification: boolean;
  available_features: {
    live_view: boolean;
  };
}

  