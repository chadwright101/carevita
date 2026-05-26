export interface BlogData {
  paragraph1: string;
  title: string;
  facility?: string;
  image1?: {
    mediaItemUrl: string;
  };
  galleryList: Array<string>;
  videoUrl: string;
}

export interface BlogPostNode {
  blog: BlogData;
  id: string;
  date: string;
  author: {
    node: {
      name: string;
    };
  };
}
