export class PaginationProperties {
  constructor(public pageSize: number = 0,
              public pageIndex: number = 0,
              public searchQuery: string = '') {}
}
