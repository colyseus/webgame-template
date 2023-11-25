import { JWT, auth, oauth } from "@colyseus/auth";
import { User } from "./database";

JWT.settings.secret = "secret";

oauth.addProvider('discord', {
  key: "799645393566695465",
  secret: "Kjv9bvAa9ZRBe8LBM5ZJ6bJsH0o44HdT",
  scope: ['identify', 'email'],
});

oauth.onCallback(async (data, provider) => {
  const profile = data.profile;
  return await User.upsert({
    discord_id: profile.id,
    name: profile.global_name || profile.username,
    locale: profile.locale,
    email: profile.email,
  });
});
