import config from "@colyseus/tools";
import { monitor } from "@colyseus/monitor";
import { playground } from "@colyseus/playground";

import { Request, auth, JWT } from "@colyseus/auth";
import "./config/auth";

/**
 * Import your Room files
 */
import { MyRoom } from "./rooms/MyRoom";
import { MonthlyScore } from "./config/database";

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

    app.get('/leaderboard', async (req, res) => {
      const scores = await MonthlyScore.query()
        .selectAll()
        .innerJoin("users", "users.id", "monthly_score.user_id")
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
  },

  beforeListen: () => {
    /**
     * Before before gameServer.listen() is called.
     */
  }
});
