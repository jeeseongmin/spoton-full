import ReactDOM from "react-dom/client";

import App from "@/App";
import "@/index.css";
import { onStartWorker } from "@/mocks/index.tsx";

(async () => {
  if (process.env.NODE_ENV === "development") {
    onStartWorker();
  }

  ReactDOM.createRoot(document.getElementById("root")!).render(<App />);
})();
