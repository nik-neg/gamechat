export class CreateMessageDto {
  readonly id: number;
  readonly content: string;
  readonly isQuestion: boolean;
  readonly likes: number;
  readonly createdAt: Date;
  readonly updatedAt: Date;
  // user: User;
}
