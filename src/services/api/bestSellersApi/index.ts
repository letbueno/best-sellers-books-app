import { AxiosResponse } from "axios";
import { apiGet } from "../index";
import { BooksList } from "../../../types/BooksList";

type ApiBooksLists = {
  results: {
    lists: BooksList[];
  };
};
const bestSellersBooksApi = {
  getbestSellersBooks: (): Promise<AxiosResponse<ApiBooksLists>> =>
    apiGet("full-overview.json"),
};

export default bestSellersBooksApi;
