import { JWT, auth, oauth } from "@colyseus/auth";
import { User } from "./database";

JWT.settings.secret = "secret";

/**
 * Email / Password Authentication
 */
auth.settings.onFindByEmail = async (email) => {
  console.log("@colyseus/auth: onFindByEmail =>", { email });
  return await User.query()
    .selectAll()
    .where("email", "=", email)
    .executeTakeFirst();
};

auth.settings.onRegister = async (email, password, options) => {
  console.log("@colyseus/auth: onRegister =>", { email, password, ...options });

  // Validate custom "options"
  const additionalData: any = {};
  if (options.birthdate) { additionalData.birthdate = options.birthdate; }
  if (options.custom_data) { additionalData.custom_data = JSON.stringify(options.custom_data); }
  if (options.locale) { additionalData.locale = options.locale; }

  console.log({
    email,
    password,
    ...additionalData,
  });

  return await User.insert({
    email,
    password,
    ...additionalData,
  });
}

/**
 * OAuth providers
 */
oauth.addProvider('discord', {
  key: "799645393566695465",
  secret: "Kjv9bvAa9ZRBe8LBM5ZJ6bJsH0o44HdT",
  scope: ['identify', 'email'],
});

oauth.onCallback(async (data, provider) => {
  console.log(data);
  const profile = data.profile;
  return await User.upsert({
    discord_id: profile.id,
    name: profile.global_name || profile.username,
    locale: profile.locale,
    email: profile.email,
  });
});
