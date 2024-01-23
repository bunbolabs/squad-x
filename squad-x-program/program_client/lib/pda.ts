// This file is auto-generated from the CIDL source.
// Editing this file directly is not recommended as it may be overwritten.

import {PublicKey} from "@solana/web3.js";

export type UsersSeeds = {
    signer: PublicKey, 
};

export const deriveUsersPDA = (
    seeds: UsersSeeds,
    programId: PublicKey
): [PublicKey, number] => {
    return PublicKey.findProgramAddressSync(
        [
            Buffer.from("USERS"),
            seeds.signer.toBuffer(),
        ],
        programId,
    )
};

export type SquadsSeeds = {
    user: PublicKey, 
};

export const deriveSquadsPDA = (
    seeds: SquadsSeeds,
    programId: PublicKey
): [PublicKey, number] => {
    return PublicKey.findProgramAddressSync(
        [
            Buffer.from("SQUADS"),
            seeds.user.toBuffer(),
        ],
        programId,
    )
};

