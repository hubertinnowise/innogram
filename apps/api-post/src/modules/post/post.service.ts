import { Injectable } from "@nestjs/common"

@Injectable()
export class PostService {
    async likePost() {

    }

    async editPost() {

    }

    //guards
    async commentPost() {

    }
    
    async getUserPosts() {

    }
    
    async createPost() {

    }

    // with some admin variations
    async removePost() {

    }
}

/*
    posts with images and text
    add likes to posts
    comment on posts

    upload images to server using multer and store them in minio
    likes and comments on posts
    pagination of the post list
*/