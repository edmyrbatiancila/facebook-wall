"use client";

import { formatPostDate } from "@/utils/formatPostDate";
import { Card, CardContent } from "../ui/card";
import { Separator } from "../ui/separator";
import { usePageContexts } from "@/contexts/PageContexts";
import EmptyState from "../ui/EmptyState";
import { Mailbox } from "lucide-react";


const PostsFeed = () => {

    // const [posts, setPosts] = useState<Posts[]>([]);
    const { posts } = usePageContexts();

    return (
        <div className="space-y-4 h-[500px] overflow-y-scroll p-10 border">
        {posts.length === 0 ? (
            <EmptyState
                title="No Posts Found"
                subtitle="Get started by adding your first post"
                icon={ <Mailbox className="h-12 w-12 text-blue-500" /> }
            >
                <h3>All your posts will be shown here...</h3>
            </EmptyState>
            
        ) : (
            posts.map((post) => (
            <Card key={ post.id } className="shadow-sm transition-all duration-300 hover:scale-[1.01]">
                <CardContent className="p-2">
                    <div className="space-y-3">
                    {post.image_url && (
                        <div className="p-2">
                            {/* <Image 
                                src={ post.image_url }
                                alt="Attached"
                                className="rounded-lg max-h-[200px] object-contain border mt-4"
                                width={ 200 }
                            /> */}
                            <img 
                                src={ post.image_url } 
                                alt="Attached" 
                                className="rounded-lg max-h-[200px] w-full object-contain border mt-4 p-2"
                            />
                        </div>
                    )}
                        
                        <div className="flex items-center justify-between">
                            <h3 className="font-semibold text-lg text-gray-800">
                                Greg Wientjes
                            </h3>
                            <span className="text-sm text-gray-500">{ formatPostDate(post.created_at) }</span>
                        </div>
                        <p
                            className="text-gray-700 leading-relaxed truncate"
                            style={{
                            fontFamily: "Comic Sans MS, cursive, sans-serif",
                            }}
                        >
                            {post.body}
                        </p>
                        <Separator className="my-3" />
                        <div className="flex space-x-4 text-sm text-gray-500">
                            <button className="hover:text-blue-600 transition-colors">
                                Like
                            </button>
                            <button className="hover:text-blue-600 transition-colors">
                                Comment
                            </button>
                            <button className="hover:text-blue-600 transition-colors">
                                Share
                            </button>
                        </div>
                    </div>
                </CardContent>
            </Card>
            ))
        )}
        
        </div>
    );
};

export default PostsFeed;
