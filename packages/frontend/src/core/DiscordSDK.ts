import { DiscordSDK, DiscordSDKMock, Events } from '@discord/embedded-app-sdk';

const queryParams = new URLSearchParams(window.location.search);
const isEmbedded = queryParams.get('frame_id') != null;

// TODO: use .env instead
const DISCORD_CLIENT_ID = "799645393566695465";

let discordSdk: DiscordSDK | DiscordSDKMock;

if (isEmbedded) {
  // Discord Client ID for the embedded app
  discordSdk = new DiscordSDK(DISCORD_CLIENT_ID);

} else {
  // We're using session storage for user_id, guild_id, and channel_id
  // This way the user/guild/channel will be maintained until the tab is closed, even if you refresh
  // Session storage will generate new unique mocks for each tab you open
  // Any of these values can be overridden via query parameters
  // i.e. if you set https://my-tunnel-url.com/?user_id=test_user_id
  // this will override this will override the session user_id value
  const mockUserId = getOverrideOrRandomSessionValue('user_id');
  const mockGuildId = getOverrideOrRandomSessionValue('guild_id');
  const mockChannelId = getOverrideOrRandomSessionValue('channel_id');

  discordSdk = new DiscordSDKMock(DISCORD_CLIENT_ID, mockGuildId, mockChannelId);
  const discriminator = String(mockUserId.charCodeAt(0) % 5);

  discordSdk._updateCommandMocks({
    authenticate: async () => {
      return await {
        access_token: 'mock_token',
        user: {
          username: mockUserId,
          discriminator,
          id: mockUserId,
          avatar: null,
          public_flags: 1,
        },
        scopes: [],
        expires: new Date(2112, 1, 1).toString(),
        application: {
          description: 'mock_app_description',
          icon: 'mock_app_icon',
          id: 'mock_app_id',
          name: 'mock_app_name',
        },
      };
    },
  });
}

enum SessionStorageQueryParam {
  user_id = 'user_id',
  guild_id = 'guild_id',
  channel_id = 'channel_id',
}

function getOverrideOrRandomSessionValue(queryParam: `${SessionStorageQueryParam}`) {
  const overrideValue = queryParams.get(queryParam);
  if (overrideValue != null) {
    return overrideValue;
  }

  const currentStoredValue = sessionStorage.getItem(queryParam);
  if (currentStoredValue != null) {
    return currentStoredValue;
  }

  // Set queryParam to a random 8-character string
  const randomString = Math.random().toString(36).slice(2, 10);
  sessionStorage.setItem(queryParam, randomString);
  return randomString;
}

const getEmbeddedDiscordAuth = async () => {
  await discordSdk.ready();

  // Authorize with Discord Client
  const { code } = await discordSdk.commands.authorize({
    client_id: DISCORD_CLIENT_ID,
    response_type: 'code',
    state: '',
    prompt: 'none',
    // More info on scopes here: https://discord.com/developers/docs/topics/oauth2#shared-resources-oauth2-scopes
    scope: [
      // "applications.builds.upload",
      // "applications.builds.read",
      // "applications.store.update",
      // "applications.entitlements",
      // "bot",
      'identify',
      // "connections",
      // "email",
      // "gdm.join",
      'guilds',
      // "guilds.join",
      'guilds.members.read',
      // "messages.read",
      // "relationships.read",
      // 'rpc.activities.write',
      // "rpc.notifications.read",
      // "rpc.voice.write",
      'rpc.voice.read',
      // "webhook.incoming",
    ],
  });

  // Retrieve an access_token from your embedded app's server
  const response = await fetch('/api/discord_token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', },
    body: JSON.stringify({ code, }),
  });
  const { access_token } = await response.json();

  // Authenticate with Discord client (using the access_token)
  return await discordSdk.commands.authenticate({ access_token, });
};

export { discordSdk, isEmbedded, getEmbeddedDiscordAuth };
