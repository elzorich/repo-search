export interface ResponseModel {
    total_count: number;
    items: RepositoryModel[];
  }

export interface RepositoryModel {
    html_url: string;
    name: string;
    language: string;
  }