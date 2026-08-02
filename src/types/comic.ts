export interface Comic {
  id: number;
  slug: string;

  title: string;
  alternativeTitle?: string;

  author: string;
  artist: string;

  description: string;

  cover: string;
  banner?: string;

  status: "Đang cập nhật" | "Hoàn thành";

  categories: string[];

  chapterCount: number;

  views: number;

  followers: number;

  rating: number;

  publishedYear: number;
}