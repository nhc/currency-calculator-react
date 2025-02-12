/* eslint-disable @typescript-eslint/no-explicit-any */
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";

import { CurrencyFormElement } from "./CurrencyFormElement";
import { api } from "@/services/api";
import { IConvertQuery, ICurrency, IFormNames } from "@/types/interfaces";
import { getUnixTime, subSeconds } from "date-fns";
import { CurrencyConvertPanel } from "./CurrencyConvertPanel";

const defaultForm1Values = {
  amount: 1,
  currency: "GBP",
  touched: getUnixTime(new Date()),
};
const defaultForm2Values = {
  amount: 0,
  currency: "EUR",
  touched: getUnixTime(subSeconds(new Date(), 10)),
};

export const CurrencyConvertFormParent = () => {
  const [convertQuery, setConvertQuery] = useState<IConvertQuery>(
    {} as IConvertQuery
  );
  const [formValues, setFormValues] = useState({
    form1: defaultForm1Values,
    form2: defaultForm2Values,
  });

  const [currencies, setCurrencies] = useState<ICurrency[]>([]);

  // Start conversion Result
  const { isLoading: isCurrenciesLoading, data: currenciesData } = useQuery({
    queryKey: ["currencyQuery"],
    queryFn: async () => api.getCurrencies(),
  });

  useEffect(() => {
    if (currenciesData && !isCurrenciesLoading) {
      setCurrencies(currenciesData);
    }
  }, [currenciesData, isCurrenciesLoading]);
  // END conversion result

  // START conversiondata results
  const { data: conversionData } = useQuery({
    queryKey: ["convertQuery", convertQuery],
    queryFn: async () =>
      api.convertCurrency(
        convertQuery?.from,
        convertQuery?.to,
        convertQuery?.amount
      ),
    enabled:
      convertQuery?.from && convertQuery?.to && convertQuery?.amount
        ? true
        : false,
    retry: false,
  });

  useEffect(() => {
    setConvertQuery({
      from: defaultForm1Values.currency,
      to: defaultForm2Values.currency,
      amount: defaultForm1Values.amount,
    });
  }, []);
  // END conversiondata results

  // START edit form values
  useEffect(() => {
    setFormValues((prev) => ({
      ...prev,
      [convertQuery.target as keyof IFormNames]: {
        ...prev[convertQuery.target as keyof IFormNames],
        amount: conversionData?.value.toFixed(2),
      },
    }));
  }, [conversionData, convertQuery.target]);

  useEffect(() => {
    const updateForm = () => {
      return formValues.form1.touched < formValues.form2.touched
        ? { target: "form1", active: "form2" }
        : { target: "form2", active: "form1" };
    };

    setConvertQuery({
      from: formValues[updateForm().active as keyof IFormNames].currency,
      to: formValues[updateForm().target as keyof IFormNames].currency,
      amount: formValues[updateForm().active as keyof IFormNames].amount,
      target: updateForm().target,
    });
  }, [formValues]);

  const handleValuesChange = (
    formId: string,
    inputValue: string,
    selectValue: string
  ) => {
    const touched = getUnixTime(new Date());
    setFormValues((prev) => ({
      ...prev,
      [formId]: { amount: inputValue, currency: selectValue, touched },
    }));
  };
  // END edit form values

  return (
    <div>
      <CurrencyConvertPanel
        conversionQuery={convertQuery}
        currencies={currencies}
        conversionResult={conversionData}
      />
      <CurrencyFormElement
        id="form1"
        currencies={currencies}
        onValuesChange={handleValuesChange}
        inputValue={formValues.form1.amount}
        selectValue={formValues.form1.currency}
      />
      <CurrencyFormElement
        id="form2"
        currencies={currencies}
        onValuesChange={handleValuesChange}
        inputValue={formValues.form2.amount}
        selectValue={formValues.form2.currency}
      />
    </div>
  );
};
