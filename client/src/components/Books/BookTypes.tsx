type VolumeInfo = {
  title: string,
  publisher: string,
  authors: string[],
  publishedDate: string,
  description: string,
  imageLinks: {
    smallThumbnail: string
  }
}

type BookItems = {
  id: string,
  volumeInfo: VolumeInfo
}

export type Books = {
  totalItems: number,
  items: BookItems[]
}

export type InitialState = {
  loading: boolean,
  books: Books,
  error: string
}