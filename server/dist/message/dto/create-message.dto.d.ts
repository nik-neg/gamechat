interface TranslatedContentDictionary {
    [key: string]: string;
}
export declare class CreateMessageDto {
    readonly id: number;
    readonly content: string;
    translatedContent: TranslatedContentDictionary;
    readonly isQuestion: boolean;
    readonly likes: number;
    readonly liked: boolean;
    readonly createdAt: Date;
    readonly updatedAt: Date;
}
export {};
