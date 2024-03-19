import path from "path";
import fs from "fs";
import express from "express";
import config from "@colyseus/tools";
import { monitor } from "@colyseus/monitor";
import { playground } from "@colyseus/playground";

import { Request, auth } from "@colyseus/auth";
import "./config/auth";

/**
 * Import your Room files
 */
import { MyRoom } from "./rooms/MyRoom";
import { db, MonthlyScore } from "./config/database";

export default config({

  initializeGameServer: (gameServer) => {
    /**
     * Define your room handlers:
     */
    gameServer.define('my_room', MyRoom);
  },

  initializeExpress: (app) => {
    /**
     * Use @colyseus/playground
     * (It is not recommended to expose this route in a production environment)
     */
    app.use("/playground", playground);

    app.get("/api/protected", auth.middleware(), (req: Request, res) => {
      res.json(req.auth);
    });

    app.get('/api/leaderboard', async (req, res) => {
      const scores = await MonthlyScore.query()
        .select(["user_id", "name", "score"])
        .innerJoin("users", "users.id", "monthly_scores.user_id")
        .orderBy("score", "desc")
        .execute();
      res.json(scores);
    })

    //
    // Discord Embedded SDK: Retrieve user token when under Discord/Embed
    //
    app.post('/api/discord_token', async (req, res) => {
      const response = await fetch(`https://discord.com/api/oauth2/token`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          client_id: process.env.DISCORD_CLIENT_ID,
          client_secret: process.env.DISCORD_CLIENT_SECRET,
          grant_type: 'authorization_code',
          code: req.body.code,
        }),
      });
      const data = await response.json();
      console.log("/api/discord_token, data ->", data);
      res.send({ access_token: data.access_token });
    });

    // Auth + OAuth providers
    app.use(auth.prefix, auth.routes());

    /**
     * Use @colyseus/monitor
     * It is recommended to protect this route with a password
     * Read more: https://docs.colyseus.io/tools/monitor/#restrict-access-to-the-panel-using-a-password
     */
    app.use("/colyseus", monitor());

    //
    // Serving the frontend build
    // This is for convenience only, frontend should be served from a CDN or another server.
    //
    app.use("/", express.static(__dirname + "/../../frontend/dist"));

    // single-page application. respond with index.html for all requests
    app.get("/:resource", (req, res) => {
      const resource = req.params.resource;
      const dir = path.normalize(__dirname + "/../../frontend/dist");
      if (fs.existsSync(path.resolve(dir, resource))) {
        res.sendFile(path.resolve(dir, resource));
      } else {
        res.sendFile(path.resolve(dir, "index.html"));
      }
    });
  },

  beforeListen: async () => {
    //
    // TODO:
    // @colyseus/database migrations are not fully implemented yet.
    //

    try {
      await db.schema.createTable("users")
        .addColumn("id", "integer", (col) => col.primaryKey())
        .addColumn("name", "text")
        .addColumn("email", "text")
        .addColumn("password", "text")
        .addColumn("discord_id", "text")
        .addColumn("locale", "text")
        .addColumn("anonymous", "integer")
        .execute();

    } catch (e) {
      // ignore
    }

    try {
      await db.schema.createTable("monthly_scores")
        .addColumn("id", "integer", (col) => col.primaryKey())
        .addColumn("user_id", "integer")
        .addColumn("score", "integer")
        .execute();
    } catch (e) {
      // ignore
    }

    /**
     * Before before gameServer.listen() is called.
     */
  }

});
