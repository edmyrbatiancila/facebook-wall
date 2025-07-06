"use client";
import PostInput from "../ProfileSection/PostInput";

const ProfileSection = () => {


    return (
        <div className="flex items-start space-x-4">
            <div className="w-32 h-48 rounded-lg overflow-hidden shadow-lg flex-shrink-0">
                <img 
                    src="/images/GregPhoto.PNG" 
                    alt="Greg Wientjes" 
                    className="w-full h-full object-cover"
                />
            </div>
            <div className="flex-1">
                <h1 className="text-3xl font-bold text-gray-800 mb-2">Greg Wientjes</h1>

                {/* Post Input */}
                <PostInput />
            </div>
        </div>
    );
}

export default ProfileSection;