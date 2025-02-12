/* eslint-disable @typescript-eslint/no-explicit-any */
import { format, fromUnixTime } from "date-fns";
import {
  IConversionResult,
  IConvertQuery,
  ICurrency,
} from "@/types/interfaces";

interface Props {
  conversionQuery: IConvertQuery;
  currencies: ICurrency[];
  conversionResult: IConversionResult | undefined;
}

export const CurrencyConvertPanel = ({
  conversionQuery,
  currencies,
  conversionResult,
}: Props) => {
  if (!currencies || !conversionQuery || !conversionResult)
    return <div>Please use the form to get a conversion...</div>;

  return (
    <div>
      <div className="result">
        <div className="conversion">
          {conversionResult?.amount}&nbsp;
          {
            currencies?.filter(
              (currency: any) => currency.short_code === conversionQuery.from
            )[0]?.name
          }
          &nbsp;equals
        </div>

        <div className="amount">
          {conversionResult?.value?.toFixed(2)}&nbsp;
          {
            currencies?.filter(
              (currency) => currency.short_code === conversionQuery.to
            )[0]?.name
          }
        </div>

        <div className="date">
          {conversionResult?.date
            ? format(
                new Date(fromUnixTime(conversionResult.timestamp)),
                "d MMM y, HH:mm:ss"
              )
            : ""}
        </div>
      </div>
    </div>
  );
};
