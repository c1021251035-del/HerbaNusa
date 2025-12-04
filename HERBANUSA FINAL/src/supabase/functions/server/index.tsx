import { Hono } from "npm:hono@4";
import { cors } from "npm:hono@4/cors";

const app = new Hono();

app.use("*", cors());

app.get("/make-server-8c7b9125/health", (c) => {
  return c.json({ status: "ok" });
});

Deno.serve(app.fetch);
