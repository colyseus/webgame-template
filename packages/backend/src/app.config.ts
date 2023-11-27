import express from "express";
import path from "path";
import cors from "cors";
import config from "@colyseus/tools";
import { monitor } from "@colyseus/monitor";
import { playground } from "@colyseus/playground";

import { Request, auth, oauth, JWT } from "@colyseus/auth";
import "./config/auth";

/**
 * Import your Room files
 */
import { MyRoom } from "./rooms/MyRoom";
import { OAuthProviderName } from "@colyseus/auth/build/oauth";

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

    app.get("/profile", JWT.middleware(), (req: Request, res) => {
      res.json(req.auth);
    });

    // Auth + OAuth providers
    const corsMiddleware =  cors({ credentials: true, origin: true, });
    app.use(auth.prefix, corsMiddleware, auth.routes());

    app.use('/auth/provider/:provider', (req: Request, res, next) => {
      const provider: OAuthProviderName = req.params.provider as any;
      if (oauth.providers[provider]) {
        next();
      } else {
        if (process.env.NODE_ENV !== "production") {
          res.status(404).send(`Configuration missing for "${provider}" OAuth provider. Please`);
        } else {
          res.status(404).send('Not found');
        }
      }
    });

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
