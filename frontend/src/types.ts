export interface NewOutputMetadata {
  textContent?: string;
  outputHash: string;
  isPublished: boolean;
  reviewers: string[];
  outputPath?: string;
}
