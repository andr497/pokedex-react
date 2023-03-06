import React from "react";
import { Provider } from "react-redux";
import store from "./reducers";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { ErrorBoundary } from "./components/ErrorBoundary";
import ThemeContext from "./providers/ThemeContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <>
    <ErrorBoundary>
      <ThemeContext>
        <Provider store={store}>
          <App />
        </Provider>
      </ThemeContext>
    </ErrorBoundary>
  </>
);
