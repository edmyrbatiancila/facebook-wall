import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import { supabase } from "@/lib/supabase";
import { toast } from "react-toastify";
import React, { useState } from "react";
import { usePageContexts } from "@/contexts/PageContexts";
import { Loader2, Mailbox, Paperclip, X } from "lucide-react";


const MAX_LENGTH = 280;
const MAX_FILE_SIZE = 3 * 1024 * 1024;
const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp"];

const PostInput = () => {

    const { addPost } = usePageContexts();

    const [postContent, setPostContent] = useState<string>("");
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [isError, setIsError] = useState<boolean>(false);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [imagePreviewUrl, setImagePreviewUrl] = useState<string | null>(null);


    const handleSubmit = async () => {

        // Error handling that will check if ever user will input a whitespace/s in the textarea.
        if (postContent.trim().length === 0) {
            setErrorMessage("Post cannot be empty.");
            return;
        }


        // Error handling that will check if ever the length of the character exceeded.
        if (postContent.length > 280) {
            setErrorMessage("Character exceeded 280 limit.");
            return;
        }

        setIsSubmitting(true);

        let imageUrl: string | null = null;

        // Upload image to supabase Storage if there's a file
        if (selectedFile) {
            const fileExt = selectedFile.name.split('.').pop();
            const fileName = `${Date.now()}.${fileExt}`;
            const filePath = `${fileName}`;

            const { error: uploadError } = await supabase.storage
                .from('post-images')
                .upload(filePath, selectedFile);

            if (uploadError) {
                toast.error('Failed to upload image.');
                setIsSubmitting(false);
                return;
            }

            // Get public URL of uploaded image
            const { data: publicUrlData } = supabase.storage
                .from("post-images")
                .getPublicUrl(filePath);

            imageUrl = publicUrlData.publicUrl;
        }

        const {data, error } = await supabase
            .from('posts')
            .insert({ body: postContent, image_url: imageUrl })
            .select('id, body, image_url, created_at')
            .single();

        setIsSubmitting(false);

        if (error || !data) {
            toast.error('Failed to post!');
        } else {
            toast.success('Post added!');
            setPostContent('');
            setSelectedFile(null);
            setImagePreviewUrl(null);
            addPost(data);
        }
    };

    const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const value = e.target.value;

        if (value.length <= MAX_LENGTH) {
            setPostContent(value);
            setErrorMessage(null);
            setIsError(false);
        } else {
            setErrorMessage('Character exceeded 280 limit');
            setIsError(true);
        }
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];

        if (!file) return;

        if (!ALLOWED_TYPES.includes(file.type)) {
        toast.error("Only JPG, PNG, or WebP images are allowed.");
        return;
        }

        if (file.size > MAX_FILE_SIZE) {
        toast.error("Image must be less than 3MB.");
        return;
        }

        setSelectedFile(file);
        setImagePreviewUrl(URL.createObjectURL(file));
    };

    const removeSelectedImage = () => {
        setSelectedFile(null);
        setImagePreviewUrl(null);
    };


    return (
        <div className="space-y-3">
            <div className="relative">
                <Textarea
                    placeholder="What is on your mind?"
                    value={ postContent }
                    onChange={ handleTextChange }
                    className="min-h-[100px] md:w-[690px] resize-none overflow-y-auto border-2 border-dashed border-gray-400 bg-white"
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
                <div className="absolute bottom-2 right-2 text-xs text-gray-500 pointer-events-none">
                    <span className={ postContent.length > MAX_LENGTH ? "text-red-600" : "text-gray-500" }>
                        { postContent.length }/{MAX_LENGTH}
                    </span>
                </div>
            </div>
        {errorMessage && (
            <p className="text-red-600 text-sm font-medium">{ errorMessage }</p>
        )}

        {/* Image Preview */}
        {imagePreviewUrl && (
            <div className="relative w-fit">
                <img 
                    src={ imagePreviewUrl } 
                    alt="Preview" 
                    className="max-h-48 rounded border object-cover"
                />
                {/* <Image 
                    src={ imagePreviewUrl }
                    alt="Preview"
                    className="max-h-48 rounded border object-cover"
                /> */}
                <button
                    type="button"
                    onClick={ removeSelectedImage }
                    className="absolute top-1 right-1 bg-white rounded-full p-1 text-red-500 hover:bg-gray-100"
                    aria-label="Remove image"
                >
                    <X size={ 18 } />
                </button>

            </div>
        )}
            <div className="flex items-center justify-between">
                <div>
                    <input 
                        type="file" 
                        accept="image/png, image/jpeg, image/webp"
                        id="file-upload"
                        className="hidden"
                        onChange={ handleFileChange }
                    />
                    <Button
                        variant="outline"
                        onClick={ () => document.getElementById('file-upload')?.click() }
                    >
                        <Paperclip size={ 16 } />
                        Attach Image
                    </Button>
                </div>
                <div>
                    <Button 
                        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md font-medium cursor-pointer"
                        onClick={ handleSubmit }
                        disabled={ 
                            isSubmitting || 
                            postContent.length === 0 ||
                            isError
                        }
                    >
                        { isSubmitting ? <Loader2 size={ 16 } className="animate-spin" /> : <Mailbox size={ 16 } /> }
                        { isSubmitting ? 'Sharing...' : 'Share' }
                    </Button>
                </div>
            </div>
            
        </div>
    );
}

export default PostInput;