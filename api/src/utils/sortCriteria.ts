import { MediaSorting } from "../contracts/media";

export const getSortingCriteria = (sortBy: MediaSorting) => {
  switch (sortBy) {
    case 'new':
      return { createdAt: -1 }
    case 'popular':
      return { likesCount: -1 }
    case 'trending':
      return { likesCount: -1, dislikesCount: 1 }
    case 'random':
      return { _id: 1 }
    default:
      return { createdAt: -1 }
  }
}
