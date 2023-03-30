export type DiscordChannel = {
  id: string;
  type: number;
  name: string;
  topic: string;
  position: number;
  flags: number;
  parent_id: string | null;
  guild_id: string;
  permission_overwrites: unknown[];
  rate_limit_per_user: number;
  nsfw: boolean;
};

export type DiscordChannelInfo = {
  id: string;
  type: number;
  name: string;
};
