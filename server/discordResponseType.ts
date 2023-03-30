        // "id": "981574102018035722",
        // "type": 4,
        // "name": "General",
        // "position": 0,
        // "flags": 0,
        // "parent_id": null,
        // "guild_id": "981574101388902451",
        // "permission_overwrites": []

export type DiscordChannel = {
  id: string,
  type: number,
  name: string,
  topic: string,
  position: number,
  flags: number,
  parent_id: string | null,
  guild_id: string,
  permission_overwrites: any;
  rate_limit_per_user: number,
  nsfw: boolean,
}

export type DiscordChannelInfo = {
  id: string,
  type: number,
  name: string,
}
