
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import MainLayout from '@/components/layouts/MainLayout';
import ProfileHeader from '@/components/profile/ProfileHeader';
import PastStreams from '@/components/profile/PastStreams';

// Mock data for the profile
const mockProfileData = {
  username: 'shanks_ttv',
  followers: 350000,
  following: 120,
  bio: 'Former professional VALORANT player. Streaming daily gameplay, tips, and hanging out with chat.',
  joinDate: 'August 2019',
  isLive: true,
};

// Mock past streams data
const mockPastStreams = [
  {
    id: '1',
    title: 'VALORANT Ranked Grind to Radiant',
    streamer: 'shanks_ttv',
    game: 'VALORANT',
    viewers: 5700,
    thumbnailUrl: 'https://static-cdn.jtvnw.net/previews-ttv/live_user_shanks_ttv-440x248.jpg',
    date: '2022-06-12'
  },
  {
    id: '2',
    title: 'Pro Scrims w/ Team',
    streamer: 'shanks_ttv',
    game: 'VALORANT',
    viewers: 6200,
    thumbnailUrl: 'https://static-cdn.jtvnw.net/previews-ttv/live_user_shanks_ttv-440x248.jpg',
    date: '2022-06-10'
  },
  {
    id: '3',
    title: 'VCT Qualifiers Watch Party',
    streamer: 'shanks_ttv',
    game: 'VALORANT',
    viewers: 4800,
    thumbnailUrl: 'https://static-cdn.jtvnw.net/previews-ttv/live_user_shanks_ttv-440x248.jpg',
    date: '2022-06-08'
  },
  {
    id: '4',
    title: 'Immortal Gameplay - Road to Radiant',
    streamer: 'shanks_ttv',
    game: 'VALORANT',
    viewers: 5100,
    thumbnailUrl: 'https://static-cdn.jtvnw.net/previews-ttv/live_user_shanks_ttv-440x248.jpg',
    date: '2022-06-06'
  },
  {
    id: '5',
    title: 'Ranked with Viewers',
    streamer: 'shanks_ttv',
    game: 'VALORANT',
    viewers: 4500,
    thumbnailUrl: 'https://static-cdn.jtvnw.net/previews-ttv/live_user_shanks_ttv-440x248.jpg',
    date: '2022-06-04'
  },
  {
    id: '6',
    title: 'New Map First Look',
    streamer: 'shanks_ttv',
    game: 'VALORANT',
    viewers: 7200,
    thumbnailUrl: 'https://static-cdn.jtvnw.net/previews-ttv/live_user_shanks_ttv-440x248.jpg',
    date: '2022-06-02'
  },
];

const ProfilePage = () => {
  const { username } = useParams<{ username: string }>();
  const [loading, setLoading] = useState(true);
  const [profileData, setProfileData] = useState(mockProfileData);
  const [pastStreams, setPastStreams] = useState(mockPastStreams);
  
  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setLoading(false);
      // Update the profile data based on the username parameter
      if (username) {
        setProfileData(prev => ({
          ...prev,
          username
        }));
        setPastStreams(prev => prev.map(stream => ({
          ...stream,
          streamer: username
        })));
      }
    }, 1000);
    
    return () => clearTimeout(timer);
  }, [username]);
  
  return (
    <MainLayout>
      <div className="pt-0 pb-20">
        <div className="mb-6">
          <ProfileHeader 
            username={profileData.username}
            followers={profileData.followers}
            following={profileData.following}
            bio={profileData.bio}
            joinDate={profileData.joinDate}
            isLive={profileData.isLive}
          />
        </div>
        
        <PastStreams 
          streams={pastStreams}
          loading={loading}
        />
      </div>
    </MainLayout>
  );
};

export default ProfilePage;
