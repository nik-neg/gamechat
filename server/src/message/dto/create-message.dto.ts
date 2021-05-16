export class CreateMessageDto {
  readonly id: number;
  readonly content: string;
  translatedContent: string;
  readonly isQuestion: boolean;
  readonly likes: number;
  readonly liked: boolean;
  readonly createdAt: Date;
  readonly updatedAt: Date;
  // user: User;
}
