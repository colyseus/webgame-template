import { jwt, oauth } from "../auth/oauth";
import { User } from "./database";

oauth.addProvider('discord', {
  key: "799645393566695465",
  secret: "Kjv9bvAa9ZRBe8LBM5ZJ6bJsH0o44HdT",
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

export const middleware = jwt.middleware();