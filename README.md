# Colyseus Webgame Template

Feel free to fork this template to build your own multiplayer web-game.

**Backend**

- `colyseus` → Multiplayer Framework
- `@colyseus/auth` → Authentication (Email/Password, OAuth, Anonymous)
	- "Forgot password" emails are sent using [Resend](https://resend.com/) (See [source-code](https://github.com/endel/colyseus-auth/blob/cfd70dc498fa2c4c83873dac25a16b22e26004a0/packages/backend/src/config/auth.ts#L40-L47))
- `@colyseus/database` → (Experimental) Kysely-powered database module

**Frontend**

- `react` → UI library
- `react-router-dom` → Navigation
- `tailwindcss` → CSS Framework
- `vite` → Build tool

Contributions for additions and improvements on this template are very welcome!

## License

MIT

