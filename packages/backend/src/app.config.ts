import express from "express";
import path from "path";
import config from "@colyseus/tools";
import { monitor } from "@colyseus/monitor";
import { playground } from "@colyseus/playground";

import { Request, auth, oauth, JsonWebToken } from "@colyseus/auth";
import "./config/auth";

/**
 * Import your Room files
 */
import { MyRoom } from "./rooms/MyRoom";

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

    app.get("/profile", JsonWebToken.middleware(), (req: Request, res) => {
      res.json(req.auth);
    });

    app.use(auth.prefix, auth.routes());

    // OAuth providers
    app.use(oauth.prefix, oauth.callback());

    /**
     * Use @colyseus/monitor
     * It is recommended to protect this route with a password
     * Read more: https://docs.colyseus.io/tools/monitor/#restrict-access-to-the-panel-using-a-password
     */
    app.use("/colyseus", monitor());
  },

  beforeListen: () => {
    /**
     * Before before gameServer.listen() is called.
     */
  }
});
