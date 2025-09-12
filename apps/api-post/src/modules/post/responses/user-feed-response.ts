import { PublicPostDto } from "../dto/public-post.dto";

export class UserFeedResponse {
    success: boolean;
    userId: string;
    total: number;
    posts: PublicPostDto[];
}