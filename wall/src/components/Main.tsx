import { posts } from "@/app/data/dummyData";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { Card, CardContent } from "./ui/card";
import { Separator } from "./ui/separator";

interface IMainProps {
    onPostContent: string;
    onSetPostContent: React.Dispatch<React.SetStateAction<string>>;
}

const Main = ({ onPostContent, onSetPostContent }: IMainProps) => {
    return (
        <div className="lg:col-span-3 space-y-6">
                {/* Profile Section */}
            <div className="flex items-start space-x-4">
                <div className="w-32 h-32 rounded-lg overflow-hidden shadow-lg flex-shrink-0">
                    <img 
                        src="https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=400" 
                        alt="Greg Wientjes" 
                        className="w-full h-full object-cover"
                    />
                </div>
                <div className="flex-1">
                    <h1 className="text-3xl font-bold text-gray-800 mb-2">Greg Wientjes</h1>
                    <h2 className="text-2xl font-semibold text-gray-700 mb-4">Wall</h2>
                        
                        {/* Post Input */}
                    <div className="space-y-3">
                        <div className="relative">
                            <Textarea
                                placeholder=""
                                value={ onPostContent }
                                onChange={(e) => onSetPostContent(e.target.value)}
                                className="min-h-[100px] border-2 border-dashed border-gray-400 bg-white relative overflow-hidden"
                                style={{
                                backgroundImage: `repeating-linear-gradient(
                                    45deg,
                                    transparent,
                                    transparent 8px,
                                    rgba(59, 130, 246, 0.1) 8px,
                                    rgba(59, 130, 246, 0.1) 16px
                                )`
                                }}
                            />
                        </div>
                        <div className="flex justify-end">
                            <Button 
                                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md font-medium"
                                onClick={() => {
                                if (onPostContent.trim()) {
                                    // Handle post submission
                                    onSetPostContent('');
                                }
                                }}
                            >
                                Share
                            </Button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Posts Feed */}
            <div className="space-y-4">
            {posts.map((post, index) => (
                <Card key={index} className="shadow-sm">
                    <CardContent className="p-6">
                        <div className="space-y-3">
                            <div className="flex items-center justify-between">
                                <h3 className="font-semibold text-lg text-gray-800">{post.name}</h3>
                                <span className="text-sm text-gray-500">{post.time}</span>
                            </div>
                            <p 
                                className="text-gray-700 leading-relaxed"
                                style={{
                                    fontFamily: 'Comic Sans MS, cursive, sans-serif'
                                }}
                            >
                                {post.message}
                            </p>
                            <Separator className="my-3" />
                            <div className="flex space-x-4 text-sm text-gray-500">
                                <button className="hover:text-blue-600 transition-colors">Like</button>
                                <button className="hover:text-blue-600 transition-colors">Comment</button>
                                <button className="hover:text-blue-600 transition-colors">Share</button>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            ))}
            </div>
        </div>
    );
}

export default Main;