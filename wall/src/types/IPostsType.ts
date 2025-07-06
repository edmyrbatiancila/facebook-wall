export interface Posts {
    id: string;
    user_id?: string | null;
    body: string;
    image_url?: string | null;
    created_at: string;
}