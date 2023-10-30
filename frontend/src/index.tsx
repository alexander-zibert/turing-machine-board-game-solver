// import { StrictMode } from 'react'
import ReactDOM from "react-dom/client";
import App from "./App";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  // <StrictMode>
  <App />
  // </StrictMode>
);

// global WASM Module setup code
const Module = {
  preRun: [],
  postRun: [],
  ready: false,
  print(text: string) {
    console.log(text);
  },
  setStatus(text: string) {
    console.log(text);
    if (text === "All downloads complete.") {
      this.ready = true;
    }
  },
  totalDependencies: 0,
  monitorRunDependencies(left: number) {
    this.totalDependencies = Math.max(this.totalDependencies, left);
    Module.setStatus(
      left
        ? "Preparing... (" +
            (this.totalDependencies - left) +
            "/" +
            this.totalDependencies +
            ")"
        : "All downloads complete."
    );
  },
};
Module.setStatus("Downloading...");
window.onerror = (event) => {
  // TODO: do not warn on ok events like simulating an infinite loop or exitStatus
  Module.setStatus("Exception thrown, see JavaScript console");
  Module.setStatus = (text) => {
    if (text) {
      console.error("[post-exception status] " + text);
    }
  };
};
(window as any).Module = Module;
