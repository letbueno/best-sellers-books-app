import { AxiosResponse } from "axios";
import { apiGet } from "../index";
import { ListBooks } from "../../../types/ListBooks";

type ApiListBooks = {
  results: {
    lists: ListBooks[];
  };
};
const bestSellersBooksApi = {
  getbestSellersBooks: (): Promise<AxiosResponse<ApiListBooks>> =>
    apiGet("full-overview.json"),
};

export default bestSellersBooksApi;
