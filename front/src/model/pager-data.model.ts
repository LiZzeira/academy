export interface PagerData<T> {
  page: number
  limit: number
  length: number
  data: T[]
}
