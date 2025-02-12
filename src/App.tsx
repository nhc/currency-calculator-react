import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { CurrencyConverter } from "./components/CurrencyConverter";
import "./index.css";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <CurrencyConverter />
      <ReactQueryDevtools initialIsOpen={true} />
    </QueryClientProvider>
  );
}

export default App;
