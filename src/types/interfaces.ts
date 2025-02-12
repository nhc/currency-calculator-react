export interface ICurrency {
  id: number;
  name: string;
  short_code: string;
  code: string;
  precision: number;
  subunit: number;
  symbol: string;
  symbol_first: boolean;
  decimal_mark: string;
  thousands_separator: string;
}

export interface IConversionQuery {
  amount: number;
  fromCurrency: string;
  toCurrency: string;
}

export interface IConversionResult {
  amount: number;
  date: string;
  from: string;
  timestamp: number;
  to: string;
  value: number;
}

export interface IConvertFormState {
  FromAmount: number;
  FromCurrencyCode: string;
  ToAmount: number;
  ToCurrencyCode: string;
  convertFrom?: string;
  convertTo?: string;
}

export interface FormValue {
  value: string;
}

export interface FormValues {
  form1: FormValue;
  form2: FormValue;
}

export interface IFormNames {
  form1: string;
  form2: string;
}

export interface IConvertQuery {
  from: string;
  to: string;
  amount: number;
  target?: string;
}
