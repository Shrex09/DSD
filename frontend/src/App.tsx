import React from "react";
import { BrowserRouter } from "react-router-dom";
import { AppRoutes } from "@/modules/public/routes";
import ErrorBoundary from "@/modules/public/components/common/ErrorBoundary";

/**
 * Root application component.
 * Provides routing context and top-level error boundary.
 */
const App = (): React.JSX.Element => {
  return (
    <ErrorBoundary>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </ErrorBoundary>
  );
};

export default App;
