import { vi } from "vitest";
import bestSellersApi from ".";
import api from "..";

describe("donationImpactsApi", () => {
  describe("#getDonationImpact", () => {
    beforeEach(() => {
      api.get = vi.fn();
    });

    it("expects to send a get request with the correct info: url, params and headers", () => {
      bestSellersApi.getbestSellersBooks();

      expect(api.get).toHaveBeenCalledWith("/full-overview.json", {
        params: { "api-key": process.env.REACT_APP_API_KEY },
      });
    });
  });
});
