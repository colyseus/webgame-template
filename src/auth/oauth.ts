import express from 'express';
import grant, { GrantProvider, GrantConfig, GrantSession } from 'grant';
import session from "express-session";
import jsonwebtoken from "jsonwebtoken";
import { expressjwt, Request } from 'express-jwt';

export type { Request };

export const jwt = {
  options: {
    secret: process.env.JWT_SECRET as jsonwebtoken.Secret,
    verify: {
      algorithms: ['HS256'],
    } as jsonwebtoken.VerifyOptions,
  },

  sign: function(payload: any, options?: jsonwebtoken.SignOptions) {
    return new Promise((resolve, reject) => {
      jsonwebtoken.sign(payload, this.options.secret, options, (err, token) => {
        if (err) reject(err);
        resolve(token);
      });
    });
  },

  verify: function (token: string) {
    return new Promise((resolve, reject) => {
      jsonwebtoken.verify(token, this.options.secret, this.options.verify, function (err, decoded) {
        if (err) reject(err);
        resolve(decoded);
      });
    });
  },
  decode: jsonwebtoken.decode,

  middleware(params?: Parameters<typeof expressjwt>[0]) {
    if (!this.options.secret) {
      console.error("❌ Please provide 'JWT_SECRET' environment variable, or set 'jwt.options.secret'.");
    }

    return expressjwt(Object.assign({
      secret: this.options.secret,
      // credentialsRequired: false,
      algorithms: this.options.verify.algorithms,
      ...this.options.verify,
    }, params));
  },
};

export type OAuthProviderName = '23andme' | '500px' | 'acton' | 'acuityscheduling' | 'adobe' | 'aha' | 'alchemer' | 'amazon' | 'angellist' | 'apple' | 'arcgis' | 'asana' | 'assembla' | 'atlassian' | 'auth0' | 'authentiq' | 'authing' | 'autodesk' | 'aweber' | 'axosoft' | 'baidu' | 'basecamp' | 'battlenet' | 'beatport' | 'bitbucket' | 'bitly' | 'box' | 'buffer' | 'campaignmonitor' | 'cas' | 'cheddar' | 'clio' | 'cognito' | 'coinbase' | 'concur' | 'constantcontact' | 'coursera' | 'crossid' | 'dailymotion' | 'deezer' | 'delivery' | 'deputy' | 'deviantart' | 'digitalocean' | 'discogs' | 'discord' | 'disqus' | 'docusign' | 'dribbble' | 'dropbox' | 'ebay' | 'echosign' | 'ecwid' | 'edmodo' | 'egnyte' | 'etsy' | 'eventbrite' | 'evernote' | 'eyeem' | 'facebook' | 'familysearch' | 'feedly' | 'figma' | 'fitbit' | 'flickr' | 'formstack' | 'foursquare' | 'freeagent' | 'freelancer' | 'freshbooks' | 'fusionauth' | 'garmin' | 'geeklist' | 'genius' | 'getbase' | 'getpocket' | 'gitbook' | 'github' | 'gitlab' | 'gitter' | 'goodreads' | 'google' | 'groove' | 'gumroad' | 'harvest' | 'hellosign' | 'heroku' | 'homeaway' | 'hootsuite' | 'huddle' | 'ibm' | 'iconfinder' | 'idme' | 'idonethis' | 'imgur' | 'infusionsoft' | 'instagram' | 'intuit' | 'jamendo' | 'jumplead' | 'kakao' | 'keycloak' | 'line' | 'linkedin' | 'live' | 'livechat' | 'logingov' | 'lyft' | 'mailchimp' | 'mailup' | 'mailxpert' | 'mapmyfitness' | 'mastodon' | 'medium' | 'meetup' | 'mendeley' | 'mention' | 'microsoft' | 'mixcloud' | 'moxtra' | 'myob' | 'naver' | 'nest' | 'netlify' | 'nokotime' | 'notion' | 'nylas' | 'okta' | 'onelogin' | 'openstreetmap' | 'optimizely' | 'osu' | 'patreon' | 'paypal' | 'phantauth' | 'pinterest' | 'plurk' | 'podio' | 'procore' | 'producthunt' | 'projectplace' | 'pushbullet' | 'qq' | 'ravelry' | 'redbooth' | 'reddit' | 'runkeeper' | 'salesforce' | 'sellsy' | 'shoeboxed' | 'shopify' | 'skyrock' | 'slack' | 'slice' | 'smartsheet' | 'smugmug' | 'snapchat' | 'snowflake' | 'socialpilot' | 'socrata' | 'soundcloud' | 'spotify' | 'square' | 'stackexchange' | 'stocktwits' | 'stormz' | 'storyblok' | 'strava' | 'stripe' | 'surveymonkey' | 'surveysparrow' | 'thingiverse' | 'ticketbud' | 'tiktok' | 'timelyapp' | 'todoist' | 'trakt' | 'traxo' | 'trello' | 'tripit' | 'trustpilot' | 'tumblr' | 'twitch' | 'twitter' | 'typeform' | 'uber' | 'unbounce' | 'underarmour' | 'unsplash' | 'untappd' | 'upwork' | 'uservoice' | 'vend' | 'venmo' | 'vercel' | 'verticalresponse' | 'viadeo' | 'vimeo' | 'visualstudio' | 'vk' | 'wechat' | 'weekdone' | 'weibo' | 'withings' | 'wordpress' | 'workos' | 'wrike' | 'xero' | 'xing' | 'yahoo' | 'yammer' | 'yandex' | 'zendesk' | 'zoom';
export type OAuthProviderConfig = {
  /**
   * consumer_key or client_id of your OAuth app
   */
  key: string;

  /**
   * consumer_secret or client_secret of your OAuth app
   */
  secret: string;

  /**
   * array of OAuth scopes to request
   */
  scope?: string[];

  /**
   * generate random nonce string (OpenID Connect only)
   */
  nonce?: boolean;

  /**
   * custom authorization parameters
   */
  custom_params?: any;

  /**
   * relative route or absolute URL to receive the response data /hello | https://site.com/hey
   */
  callback?: string;

  /**
   * relative route or absolute URL to receive the response data /hello | https://site.com/hey
   */
  response?: Array<'tokens' | 'raw' | 'jwt' | 'profile'>
}

// import redis from "redis";
// import connectRedis from "connect-redis";

// const client = redis.createClient();
// const RedisStore = connectRedis(session);

type OAuthCallback = (data: GrantSession['response'], provider: OAuthProviderName) => Promise<unknown>;
let oAuthCallback: (data: GrantSession['response'], provider: OAuthProviderName) => Promise<unknown> = async (data, provider) => {
  console.debug("OAuth callback missing. Use oauth.onCallback() to persist user data.");
  return data;
};

export const oauth = {
  defaults: {
    // origin: process.env.BACKEND_URL,
    transport: "session",
    state: true,
    response: ["tokens", "raw", "profile"],
  } as GrantProvider & { prefix: never },

  prefix: "/oauth",
  providers: {} as { [providerId in OAuthProviderName]: OAuthProviderConfig },

  addProvider: function(providerId: OAuthProviderName, config: OAuthProviderConfig) {
    this.providers[providerId] = config;
  },

  onCallback: function (callback: OAuthCallback) {
    oAuthCallback = callback;
  },

  /**
   * Returns an Express Router that handles OAuth for configured providers.
   * @param callback (optional) Callback function that is called when OAuth is successful.
   * @returns Express Router
   */
  callback: function (callback?: OAuthCallback) {
    if (callback) {
      this.onCallback(callback);
    }

    const router = express.Router();

    const sessionMiddleware = session({
      secret: process.env.SESSION_SECRET,
      resave: false,
      saveUninitialized: false, // true
      // store: new RedisStore({ client: client }),
    });

    // set prefix
    const config: GrantConfig = Object.assign({ defaults: this.defaults }, this.providers);
    config.defaults.prefix = oauth.prefix;

    router.use(sessionMiddleware);
    router.use(grant.express(config));

    router.get("/:providerId/callback", async (req, res) => {
      const session = req.session as typeof req.session & { grant: GrantSession };
      const data = await oAuthCallback(session.grant.response, session.grant.provider as OAuthProviderName);

      // TODO: replace '*' with origin
      res.send(`<!DOCTYPE html><html><head><script type="text/javascript">window.opener.postMessage(${JSON.stringify(data)}, '*');</script></head><body></body></html> `);
      res.end();
    });

    return router;
  }
}
