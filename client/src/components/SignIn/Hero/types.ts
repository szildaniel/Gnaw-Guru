export interface ISlide {
  text: string;
  author: string;
  avatarUrl: string;
}

export interface ISlideExtended extends ISlide {
  isActive: boolean;
}
