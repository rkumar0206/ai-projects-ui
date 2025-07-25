export interface ImageResponse {
    id: Number;
    prompt: string; // The prompt used to generate the image
    image: string; // URL of the image
    description: string; // Description of the image
}

export interface PartialImageResponses {

    id: Number;
    prompt: string; // The prompt used to generate the image
}
