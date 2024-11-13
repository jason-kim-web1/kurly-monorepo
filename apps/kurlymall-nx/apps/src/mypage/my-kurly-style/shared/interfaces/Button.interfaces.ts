import { Category, ThumbnailImage } from '../../../../shared/interfaces/MyKurlyStyle';

export interface Button {
  id: string;
  name: string;
  description: string;
  thumbnailImages: ThumbnailImage[];
  categories: Category[];
}
