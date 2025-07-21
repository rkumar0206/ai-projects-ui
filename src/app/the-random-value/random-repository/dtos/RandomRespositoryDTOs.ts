export interface RandomRespositoryResponse {
    repositories: Repository[];
}

export interface Repository {
  url: string;
  briefDescription: string;
  languages: string[];
}