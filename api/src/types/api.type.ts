export type ApiQuery = {
  page?: number;
  limit?: number;
  sortedBy?: 'ASC' | 'DESC';
  username?: string;
  email?: string;
  roles?: string;
  gender?: 'men' | 'women' | 'unisex';
  name?: string;
};
