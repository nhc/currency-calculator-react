import { IConversionResult, ICurrency } from "@/types/interfaces";
import { sortByStringProperty } from "../utils/sorting";

const API_KEY = import.meta.env.VITE_API_KEY;
const BASE_URL = "https://api.currencybeacon.com/v1";

export const api = {
  async getCurrencies(): Promise<ICurrency[]> {
    const response = await fetch(`${BASE_URL}/currencies?type=flat`, {
      headers: { Authorization: `Bearer ${API_KEY}` },
    });
    const json = await response.json();
    return sortByStringProperty(json.response, "name", "asc");
  },

  async convertCurrency(
    from: string,
    to: string,
    amount: number
  ): Promise<IConversionResult> {
    const response = await fetch(
      `${BASE_URL}/convert?` +
        new URLSearchParams({
          from,
          to,
          amount: amount.toString(),
        }).toString(),
      {
        headers: { Authorization: `Bearer ${API_KEY}` },
      }
    );
    const json = await response.json();

    return json.response;
  },
};
