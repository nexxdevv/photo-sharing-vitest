import { render } from "@testing-library/react";
import { ReactElement } from "react";
import { AuthProvider } from "@/context/AuthContext";

export function renderWithProviders(ui: ReactElement) {
  return render(<AuthProvider>{ui}</AuthProvider>);
}
