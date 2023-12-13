import path from "path";
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
    if (process.env.NODE_ENV !== "production") {
        app.use("/playground", playground);
    }

    app.get("/protected", auth.middleware(), (req: Request, res) => {
      res.json(req.auth);
    });

    app.get('/leaderboard', async (req, res) => {
      const scores = await MonthlyScore.query()
        .selectAll()
        .innerJoin("users", "users.id", "monthly_scores.user_id")
        .orderBy("score", "desc")
        .execute();
      res.json(scores);
    })

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
    app.get("*", (req, res) => res.sendFile(path.normalize(__dirname + "/../../frontend/dist"))); // single-page application
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
