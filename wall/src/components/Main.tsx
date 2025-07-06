import ProfileSection from "./Main/ProfileSection";
import PostsFeed from "./Main/PostsFeed";


const Main = () => {
    return (
        <div className="lg:col-span-3 space-y-6">
            {/* Profile Section */}
            <ProfileSection />

            {/* Posts Feed */}
            <PostsFeed />
        </div>
    );
}

export default Main;