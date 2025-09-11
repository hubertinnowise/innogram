import { PublicPostDto } from "../dto";

export class GetPostResponse {
  success: boolean;
  post?: PublicPostDto;
  message?: string;
}