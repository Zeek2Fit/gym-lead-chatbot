import fs from "node:fs";
import path from "node:path";
import { type Server } from "node:http";

import express, { type Express } from "express";
import runApp from "./app";

export async function serveStatic(app: Express, _server: Server) {
  const distPath = path.resolve(import.meta.dirname, "public");

  if (!fs.existsSync(distPath)) {
    throw new Error(
      `Could not find the build directory: ${distPath}, make sure to build the client first`,
    );
  }

  // Serve widget-loader.js BEFORE static middleware with correct MIME type and CORS headers
  app.get("/widget-loader.js", (_req, res) => {
    try {
      const widgetContent = fs.readFileSync(path.resolve(distPath, "widget-loader.js"), "utf-8");
      res.set({
        "Content-Type": "application/javascript; charset=utf-8",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET",
        "Cache-Control": "public, max-age=3600"
      });
      res.send(widgetContent);
    } catch (error) {
      console.error("Failed to serve widget-loader.js:", error);
      res.status(404).send("Widget loader not found");
    }
  });

  // Static files middleware for other assets
  app.use(express.static(distPath, {
    setHeaders: (res, path) => {
      if (path.endsWith('.js')) {
        res.set('Content-Type', 'application/javascript; charset=utf-8');
      }
    }
  }));

  // fall through to index.html if the file doesn't exist
  app.use("*", (_req, res) => {
    res.sendFile(path.resolve(distPath, "index.html"));
  });
}

(async () => {
  await runApp(serveStatic);
})();
