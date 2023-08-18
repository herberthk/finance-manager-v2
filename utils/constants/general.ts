const isBrowser = typeof window !== "undefined";
const host = isBrowser ? window.location.hostname : null;
export const SERVER_URL =
  host === "localhost"
    ? "http://localhost:8000"
    : "https://finance-manager.cyclic.app";
export const clientId =
  "464607925379-cirq4f7fqka2eskmhhdk9n8d04gu5kbl.apps.googleusercontent.com";
