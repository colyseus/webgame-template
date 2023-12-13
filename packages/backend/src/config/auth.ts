import { JWT, auth } from "@colyseus/auth";
import { User } from "./database";
import { resend } from "./email";

JWT.settings.secret = "secret";

/**
 * Email / Password Authentication
 */
auth.settings.onFindUserByEmail = async (email) => {
  console.log("@colyseus/auth: onFindByEmail =>", { email });
  return await User.query()
    .selectAll()
    .where("email", "=", email)
    .executeTakeFirst();
};

auth.settings.onRegisterWithEmailAndPassword = async (email, password, options) => {
  console.log("@colyseus/auth: onRegister =>", { email, password, ...options });

  // Validate custom "options"
  const additionalData: any = {};
  if (options.birthdate) { additionalData.birthdate = options.birthdate; }
  if (options.custom_data) { additionalData.custom_data = JSON.stringify(options.custom_data); }
  if (options.locale) { additionalData.locale = options.locale; }

  const name = options.name || email.split("@")[0];

  return await User.insert({
    name,
    email,
    password,
    ...additionalData,
  });
}

auth.settings.onForgotPassword = async (email: string, htmlContents: string/* , resetPasswordLink: string */) => {
  await resend.emails.send({
    from: 'web-template@colyseus.dev',
    to: email,
    subject: '[Colyseus Web Template]: Reset password',
    html: htmlContents
  });
}

auth.settings.onResetPassword = async (email: string, password: string) => {
  await User.update({ password }).where("email", "=", email).execute();
}

/**
 * OAuth providers
 */
auth.oauth.addProvider('discord', {
  key: "799645393566695465",
  secret: "Kjv9bvAa9ZRBe8LBM5ZJ6bJsH0o44HdT",
  scope: ['identify', 'email'],
});

auth.oauth.onCallback(async (data, provider) => {
  console.log(data);
  const profile = data.profile;
  return await User.upsert({
    discord_id: profile.id,
    name: profile.global_name || profile.username,
    locale: profile.locale,
    email: profile.email,
  });
});
