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
  slug: string;
  id: string;
  date: string;
  modified: string;
  author: {
    node: {
      name: string;
    };
  };
}
