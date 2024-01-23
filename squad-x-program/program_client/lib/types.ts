// This file is auto-generated from the CIDL source.
// Editing this file directly is not recommended as it may be overwritten.

import type {Schema} from 'borsh';
import type {Decoded} from "./utils";
import {PublicKey} from "@solana/web3.js";
import { deserialize } from "borsh";

/// Users data structure
export interface Users {
  displayName: string;
  xp: number;
  badge: string;
  squad: PublicKey;
}

export const decodeUsers = (decoded: Decoded): Users => ({
    displayName: decoded["display_name"] as string,
    xp: decoded["xp"] as number,
    badge: decoded["badge"] as string,
    squad: new PublicKey(decoded["squad"] as Uint8Array),
});

export const UsersSchema: Schema =  {
    struct: {
        display_name: "string",
        xp: "u16",
        badge: "string",
        squad: { array: { type: "u8", len: 32 } },
    }
};

/// Squads data structure.
export interface Squads {
  displayName: string;
  motto: string;
  members: number;
  xp: number;
  badge: string;
  authority: PublicKey;
}

export const decodeSquads = (decoded: Decoded): Squads => ({
    displayName: decoded["display_name"] as string,
    motto: decoded["motto"] as string,
    members: decoded["members"] as number,
    xp: decoded["xp"] as number,
    badge: decoded["badge"] as string,
    authority: new PublicKey(decoded["authority"] as Uint8Array),
});

export const SquadsSchema: Schema =  {
    struct: {
        display_name: "string",
        motto: "string",
        members: "u16",
        xp: "u16",
        badge: "string",
        authority: { array: { type: "u8", len: 32 } },
    }
};

/// Quests data structure.
export interface Quests {
  name: string;
  description: string;
  tag: string;
  reward: number;
}

export const decodeQuests = (decoded: Decoded): Quests => ({
    name: decoded["name"] as string,
    description: decoded["description"] as string,
    tag: decoded["tag"] as string,
    reward: decoded["reward"] as number,
});

export const QuestsSchema: Schema =  {
    struct: {
        name: "string",
        description: "string",
        tag: "string",
        reward: "u16",
    }
};



