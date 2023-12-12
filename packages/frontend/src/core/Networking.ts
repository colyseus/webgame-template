import { Client } from "colyseus.js";

// detect if we're running on localhost
const endpoint = (window.location.href.indexOf("localhost") >= 0 || window.location.href.indexOf("127.0.0.1") >= 0)
  ? "http://localhost:2567"
  : "https://us-lax-af65ebed.colyseus.dev";

export const client = new Client(endpoint);