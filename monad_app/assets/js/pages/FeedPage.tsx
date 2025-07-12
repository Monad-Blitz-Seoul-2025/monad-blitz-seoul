import React, { useState, useRef, useEffect } from "react";
import { Head } from "@inertiajs/react";
import { Heart, X, MapPin, Briefcase, GraduationCap } from "lucide-react";
import Layout from "../components/layouts";

interface UserProfile {
  id: number;
  name: string;
  age: number;
  location: string;
  occupation: string;
  education: string;
  bio: string;
  photos: string[];
  interests: string[];
}

const mockProfiles: UserProfile[] = [
  {
    id: 1,
    name: "김민지",
    age: 26,
    location: "서울, 강남구",
    occupation: "UX 디자이너",
    education: "홍익대학교",
    bio: "새로운 사람들과의 만남을 좋아하고, 디자인과 예술에 관심이 많아요. 주말에는 갤러리나 카페 투어를 즐깁니다.",
    photos: [
      "https://images.unsplash.com/photo-1494790108755-2616b612b47c?w=500&h=700&fit=crop",
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=500&h=700&fit=crop",
    ],
    interests: ["디자인", "여행", "카페", "영화", "전시회"],
  },
  {
    id: 2,
    name: "박성훈",
    age: 29,
    location: "서울, 마포구",
    occupation: "소프트웨어 엔지니어",
    education: "연세대학교",
    bio: "기술과 혁신을 사랑하는 개발자입니다. 운동을 좋아하고 새로운 도전을 즐깁니다.",
    photos: [
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&h=700&fit=crop",
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=500&h=700&fit=crop",
    ],
    interests: ["프로그래밍", "헬스", "게임", "독서", "요리"],
  },
  {
    id: 3,
    name: "이서연",
    age: 24,
    location: "서울, 홍대",
    occupation: "마케터",
    education: "이화여자대학교",
    bio: "창의적인 아이디어로 브랜드를 만들어가는 일을 하고 있어요. 음악과 춤을 사랑합니다!",
    photos: [
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500&h=700&fit=crop",
      "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=500&h=700&fit=crop",
    ],
    interests: ["마케팅", "음악", "춤", "패션", "맛집"],
  },
];

export default function FeedPage() {
  const [profiles, setProfiles] = useState<UserProfile[]>(mockProfiles);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);

  const cardRef = useRef<HTMLDivElement>(null);
  const startPos = useRef({ x: 0, y: 0 });

  const currentProfile = profiles[currentIndex];

  const handleStart = (clientX: number, clientY: number) => {
    setIsDragging(true);
    startPos.current = { x: clientX, y: clientY };
  };

  const handleMove = (clientX: number, clientY: number) => {
    if (!isDragging) return;

    const deltaX = clientX - startPos.current.x;
    const deltaY = clientY - startPos.current.y;
    setDragOffset({ x: deltaX, y: deltaY });
  };

  const handleEnd = () => {
    setIsDragging(false);

    if (Math.abs(dragOffset.x) > 100) {
      if (dragOffset.x > 0) {
        handleLike();
      } else {
        handlePass();
      }
    }

    setDragOffset({ x: 0, y: 0 });
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    handleStart(e.clientX, e.clientY);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    handleMove(e.clientX, e.clientY);
  };

  const handleMouseUp = () => {
    handleEnd();
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    const touch = e.touches[0];
    handleStart(touch.clientX, touch.clientY);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    const touch = e.touches[0];
    handleMove(touch.clientX, touch.clientY);
  };

  const handleTouchEnd = () => {
    handleEnd();
  };

  const handleLike = () => {
    console.log("Liked:", currentProfile?.name);
    nextProfile();
  };

  const handlePass = () => {
    console.log("Passed:", currentProfile?.name);
    nextProfile();
  };

  const nextProfile = () => {
    setCurrentPhotoIndex(0);
    if (currentIndex < profiles.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setCurrentIndex(0);
    }
  };

  const nextPhoto = () => {
    if (
      currentProfile &&
      currentPhotoIndex < currentProfile.photos.length - 1
    ) {
      setCurrentPhotoIndex(currentPhotoIndex + 1);
    }
  };

  const prevPhoto = () => {
    if (currentPhotoIndex > 0) {
      setCurrentPhotoIndex(currentPhotoIndex - 1);
    }
  };

  const getCardStyle = () => {
    const rotation = dragOffset.x * 0.1;
    const opacity = 1 - Math.abs(dragOffset.x) / 300;

    return {
      transform: `translate(${dragOffset.x}px, ${dragOffset.y}px) rotate(${rotation}deg)`,
      opacity: Math.max(opacity, 0.5),
    };
  };

  const getOverlayOpacity = (type: "like" | "pass") => {
    if (type === "like" && dragOffset.x > 50) {
      return Math.min(dragOffset.x / 150, 1);
    }
    if (type === "pass" && dragOffset.x < -50) {
      return Math.min(Math.abs(dragOffset.x) / 150, 1);
    }
    return 0;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-800 to-pink-800 flex items-center justify-center px-4">
      <div className="w-full max-w-sm mx-auto">
        {/* Card Container */}
        <div className="relative h-[70vh] max-h-[650px] mb-6">
          <div
            ref={cardRef}
            className="absolute inset-0 bg-white rounded-2xl shadow-2xl overflow-hidden cursor-grab active:cursor-grabbing"
            style={getCardStyle()}
            onMouseDown={handleMouseDown}
            onMouseMove={isDragging ? handleMouseMove : undefined}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            {/* Like Overlay */}
            <div
              className="absolute inset-0 bg-green-500/80 flex items-center justify-center z-10 pointer-events-none"
              style={{ opacity: getOverlayOpacity("like") }}
            >
              <div className="transform rotate-12 border-4 border-white rounded-lg px-4 py-2">
                <span className="text-white font-bold text-2xl">LIKE</span>
              </div>
            </div>

            {/* Pass Overlay */}
            <div
              className="absolute inset-0 bg-red-500/80 flex items-center justify-center z-10 pointer-events-none"
              style={{ opacity: getOverlayOpacity("pass") }}
            >
              <div className="transform -rotate-12 border-4 border-white rounded-lg px-4 py-2">
                <span className="text-white font-bold text-2xl">NOPE</span>
              </div>
            </div>

            {/* Photo Section */}
            <div className="relative h-2/3">
              <img
                src={currentProfile.photos[currentPhotoIndex]}
                alt={currentProfile.name}
                className="w-full h-full object-cover"
              />

              {/* Photo Navigation */}
              <div className="absolute top-4 left-4 right-4 flex space-x-1">
                {currentProfile.photos.map((_, index) => (
                  <div
                    key={index}
                    className={`flex-1 h-1 rounded-full ${
                      index === currentPhotoIndex ? "bg-white" : "bg-white/30"
                    }`}
                  />
                ))}
              </div>

              {/* Photo Navigation Buttons */}
              <button
                onClick={prevPhoto}
                className="absolute left-0 top-0 h-full w-1/2 z-20"
              />
              <button
                onClick={nextPhoto}
                className="absolute right-0 top-0 h-full w-1/2 z-20"
              />
            </div>

            {/* Profile Info */}
            <div className="p-4 h-1/3 overflow-y-auto">
              <div className="mb-3">
                <h2 className="text-xl font-bold text-gray-900">
                  {currentProfile.name}, {currentProfile.age}
                </h2>
              </div>

              <div className="space-y-1 mb-3">
                <div className="flex items-center text-gray-600">
                  <MapPin className="w-4 h-4 mr-2" />
                  <span className="text-xs">{currentProfile.location}</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <Briefcase className="w-4 h-4 mr-2" />
                  <span className="text-xs">{currentProfile.occupation}</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <GraduationCap className="w-4 h-4 mr-2" />
                  <span className="text-xs">{currentProfile.education}</span>
                </div>
              </div>

              <p className="text-gray-700 text-xs mb-3 leading-relaxed">
                {currentProfile.bio}
              </p>

              <div className="flex flex-wrap gap-2">
                {currentProfile.interests.map((interest, index) => (
                  <span
                    key={index}
                    className="bg-pink-100 text-pink-800 px-3 py-1 rounded-full text-xs font-medium"
                  >
                    {interest}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-center space-x-8">
          <button
            onClick={handlePass}
            className="w-16 h-16 bg-red-500 rounded-full flex items-center justify-center text-white shadow-lg hover:bg-red-600 transition-colors"
          >
            <X className="w-8 h-8" />
          </button>

          <button
            onClick={handleLike}
            className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center text-white shadow-lg hover:bg-green-600 transition-colors"
          >
            <Heart className="w-8 h-8" />
          </button>
        </div>
      </div>
    </div>
  );
}
