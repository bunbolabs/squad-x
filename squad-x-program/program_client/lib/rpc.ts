// This file is auto-generated from the CIDL source.
// Editing this file directly is not recommended as it may be overwritten.

import * as pda from "./pda";
import * as T from "./types";
import {
    Commitment,
    Connection,
    GetAccountInfoConfig,
    Keypair,
    PublicKey,
    sendAndConfirmTransaction,
    SystemProgram,
    Transaction,
    TransactionInstruction,
    TransactionSignature,
} from "@solana/web3.js";
import {deserialize, serialize} from "borsh";


let _programId: PublicKey;
let _connection: Connection;

export const initializeClient = (
    programId: PublicKey,
    connection: Connection
) => {
    _programId = programId;
    _connection = connection;
};

export enum SquadXInstruction {
/**
 * Create new user account.
 *
 * Accounts:
 * 0. `[writable, signer]` fee_payer: {@link PublicKey} Auto-generated, default fee payer
 * 1. `[writable]` user: {@link Users} 
 * 2. `[]` system_program: {@link PublicKey} Auto-generated, for account initialization
 *
 * Data:
 * - display_name: {@link string} 
 * - user_seed_signer: {@link PublicKey} Auto-generated, from input user of type [Users] set the seed named signer, required by the type
 */
    CreateUserAccount = 0,

/**
 * Create new squad account.
 *
 * Accounts:
 * 0. `[writable, signer]` fee_payer: {@link PublicKey} Auto-generated, default fee payer
 * 1. `[]` author: {@link Users} 
 * 2. `[writable]` squad: {@link Squads} 
 * 3. `[]` system_program: {@link PublicKey} Auto-generated, for account initialization
 *
 * Data:
 * - display_name: {@link string} 
 * - motto: {@link string} 
 * - author_seed_signer: {@link PublicKey} Auto-generated, from input author of type [Users] set the seed named signer, required by the type
 */
    CreateSquadAccount = 1,
}

export type CreateUserAccountArgs = {
    feePayer: PublicKey;
    displayName: string;
    userSeedSigner: PublicKey;
};


/**
 * ### Returns a {@link TransactionInstruction}
 * Create new user account.
 *
 * Accounts:
 * 0. `[writable, signer]` fee_payer: {@link PublicKey} Auto-generated, default fee payer
 * 1. `[writable]` user: {@link Users} 
 * 2. `[]` system_program: {@link PublicKey} Auto-generated, for account initialization
 *
 * Data:
 * - display_name: {@link string} 
 * - user_seed_signer: {@link PublicKey} Auto-generated, from input user of type [Users] set the seed named signer, required by the type
 */
export const createUserAccount = (args: CreateUserAccountArgs): TransactionInstruction => {
    const data = serialize(
        {
            struct: {
                id: "u8",
                display_name: "string",
                user_seed_signer: { array: { type: "u8", len: 32 } },
            },
        },
        {
            id: SquadXInstruction.CreateUserAccount,
            display_name: args.displayName,
            user_seed_signer: args.userSeedSigner.toBytes(),
        }
    );

    const [userPubkey] = pda.deriveUsersPDA({
        signer: args.userSeedSigner,
    }, _programId);

    return new TransactionInstruction({
        data: Buffer.from(data),
        keys: [
            {pubkey: args.feePayer, isSigner: true, isWritable: true},
            {pubkey: userPubkey, isSigner: false, isWritable: true},
            {pubkey: new PublicKey("11111111111111111111111111111111"), isSigner: false, isWritable: false},
        ],
        programId: _programId,
    });
};

/**
 * ### Returns a {@link TransactionSignature}
 * Create new user account.
 *
 * Accounts:
 * 0. `[writable, signer]` fee_payer: {@link PublicKey} Auto-generated, default fee payer
 * 1. `[writable]` user: {@link Users} 
 * 2. `[]` system_program: {@link PublicKey} Auto-generated, for account initialization
 *
 * Data:
 * - display_name: {@link string} 
 * - user_seed_signer: {@link PublicKey} Auto-generated, from input user of type [Users] set the seed named signer, required by the type
 */
export const createUserAccountSendAndConfirm = async (
    args: Omit<CreateUserAccountArgs, "feePayer"> & { 
        signers: { feePayer: Keypair, }
 }
): Promise<TransactionSignature> => {
    const trx = new Transaction();


    trx.add(createUserAccount({
        ...args,
        feePayer: args.signers.feePayer.publicKey,
    }));

    return await sendAndConfirmTransaction(
        _connection,
        trx,
        [args.signers.feePayer, ]
    );
};

export type CreateSquadAccountArgs = {
    feePayer: PublicKey;
    displayName: string;
    motto: string;
    authorSeedSigner: PublicKey;
};


/**
 * ### Returns a {@link TransactionInstruction}
 * Create new squad account.
 *
 * Accounts:
 * 0. `[writable, signer]` fee_payer: {@link PublicKey} Auto-generated, default fee payer
 * 1. `[]` author: {@link Users} 
 * 2. `[writable]` squad: {@link Squads} 
 * 3. `[]` system_program: {@link PublicKey} Auto-generated, for account initialization
 *
 * Data:
 * - display_name: {@link string} 
 * - motto: {@link string} 
 * - author_seed_signer: {@link PublicKey} Auto-generated, from input author of type [Users] set the seed named signer, required by the type
 */
export const createSquadAccount = (args: CreateSquadAccountArgs): TransactionInstruction => {
    const data = serialize(
        {
            struct: {
                id: "u8",
                display_name: "string",
                motto: "string",
                author_seed_signer: { array: { type: "u8", len: 32 } },
            },
        },
        {
            id: SquadXInstruction.CreateSquadAccount,
            display_name: args.displayName,
            motto: args.motto,
            author_seed_signer: args.authorSeedSigner.toBytes(),
        }
    );

    const [authorPubkey] = pda.deriveUsersPDA({
        signer: args.authorSeedSigner,
    }, _programId);
    const [squadPubkey] = pda.deriveSquadsPDA({
        user: args.author,
    }, _programId);

    return new TransactionInstruction({
        data: Buffer.from(data),
        keys: [
            {pubkey: args.feePayer, isSigner: true, isWritable: true},
            {pubkey: authorPubkey, isSigner: false, isWritable: false},
            {pubkey: squadPubkey, isSigner: false, isWritable: true},
            {pubkey: new PublicKey("11111111111111111111111111111111"), isSigner: false, isWritable: false},
        ],
        programId: _programId,
    });
};

/**
 * ### Returns a {@link TransactionSignature}
 * Create new squad account.
 *
 * Accounts:
 * 0. `[writable, signer]` fee_payer: {@link PublicKey} Auto-generated, default fee payer
 * 1. `[]` author: {@link Users} 
 * 2. `[writable]` squad: {@link Squads} 
 * 3. `[]` system_program: {@link PublicKey} Auto-generated, for account initialization
 *
 * Data:
 * - display_name: {@link string} 
 * - motto: {@link string} 
 * - author_seed_signer: {@link PublicKey} Auto-generated, from input author of type [Users] set the seed named signer, required by the type
 */
export const createSquadAccountSendAndConfirm = async (
    args: Omit<CreateSquadAccountArgs, "feePayer"> & { 
        signers: { feePayer: Keypair, }
 }
): Promise<TransactionSignature> => {
    const trx = new Transaction();


    trx.add(createSquadAccount({
        ...args,
        feePayer: args.signers.feePayer.publicKey,
    }));

    return await sendAndConfirmTransaction(
        _connection,
        trx,
        [args.signers.feePayer, ]
    );
};

// Getters

export const getUsers = async (
    publicKey: PublicKey,
    commitmentOrConfig: Commitment | GetAccountInfoConfig | undefined = "processed"
): Promise<T.Users | undefined> => {
    const buffer = await _connection.getAccountInfo(publicKey, commitmentOrConfig);

    if (!buffer) {
        return undefined
    }

    if (buffer.data.length <= 0) {
        return undefined
    }

    return T.decodeUsers(deserialize(T.UsersSchema, buffer.data) as Record<string, unknown>);
}

export const getSquads = async (
    publicKey: PublicKey,
    commitmentOrConfig: Commitment | GetAccountInfoConfig | undefined = "processed"
): Promise<T.Squads | undefined> => {
    const buffer = await _connection.getAccountInfo(publicKey, commitmentOrConfig);

    if (!buffer) {
        return undefined
    }

    if (buffer.data.length <= 0) {
        return undefined
    }

    return T.decodeSquads(deserialize(T.SquadsSchema, buffer.data) as Record<string, unknown>);
}

export const getQuests = async (
    publicKey: PublicKey,
    commitmentOrConfig: Commitment | GetAccountInfoConfig | undefined = "processed"
): Promise<T.Quests | undefined> => {
    const buffer = await _connection.getAccountInfo(publicKey, commitmentOrConfig);

    if (!buffer) {
        return undefined
    }

    if (buffer.data.length <= 0) {
        return undefined
    }

    return T.decodeQuests(deserialize(T.QuestsSchema, buffer.data) as Record<string, unknown>);
}


// Websocket Events

