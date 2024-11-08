import { AxiosResponse } from "axios";
import { apiGet } from "../index";

const bestSellersBooksApi = {
  getbestSellersBooks: (): Promise<AxiosResponse<any>> =>
    apiGet("full-overview.json"),
};

export default bestSellersBooksApi;
