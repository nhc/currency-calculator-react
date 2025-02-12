import { ICurrency } from "@/types/interfaces";
import { useRef } from "react";

interface Props {
  id: "form1" | "form2";
  currencies: ICurrency[];
  onValuesChange: (id: string, inputValue: string, selectValue: string) => void;
  inputValue?: number;
  selectValue?: string;
}

export const CurrencyFormElement = ({
  id,
  currencies,
  onValuesChange,
  inputValue = 0,
  selectValue = "",
}: Props) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const selectRef = useRef<HTMLSelectElement>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const currentSelectValue = selectRef.current?.value || selectValue;
    onValuesChange(id, e.target.value, currentSelectValue);
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const currentInputValue = inputRef.current?.value || inputValue;
    onValuesChange(id, currentInputValue.toString(), e.target.value);
  };

  return (
    <form className="converter-parent" id={id}>
      <input
        ref={inputRef}
        min="1"
        step="0.01"
        type="number"
        value={inputValue}
        onChange={handleInputChange}
        placeholder={`Type in ${id}...`}
      />
      <select ref={selectRef} value={selectValue} onChange={handleSelectChange}>
        {currencies?.map((currency) => (
          <option key={currency.short_code} value={currency.short_code}>
            {currency.name}
          </option>
        ))}
      </select>
    </form>
  );
};
