"use client";

import { supabase } from "@/lib/supabase";
import { Posts } from "@/types/IPostsType";
import React, { createContext, useContext, useEffect, useState } from "react";

interface IProps {
    posts: Posts[];
    setPosts: React.Dispatch<React.SetStateAction<Posts[]>>;
    addPost: (newPost: Posts) => void;
}

const PageContexts = createContext<IProps | undefined>(undefined);

export const PageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {

    const [posts, setPosts] = useState<Posts[]>([]);

    useEffect(() => {
        const fetchPosts = async () => {
            const { data, error } = await supabase
                .from("posts")
                .select("id, body, image_url, created_at")
                .order("created_at", { ascending: false });

            if (error) {
                console.error("Error fetching posts: ", error);
            } else {
                setPosts(data);
            }
        };

        fetchPosts();
    }, []);

    const addPost = (newPost: Posts) => {
        setPosts((prev) => [newPost, ...prev]);
    };


    const contextValue: IProps = {
        posts,
        setPosts,
        addPost
    };

    return (
        <PageContexts.Provider value={ contextValue }>
            { children }
        </PageContexts.Provider>
    );
};

export const usePageContexts = () => {
    const context = useContext(PageContexts);

    if (context === undefined) {
        throw new Error('usePageContexts must be used within an PageProvider');
    }

    return context;
};