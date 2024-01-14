import * as anchor from "@coral-xyz/anchor";
import { Program } from "@coral-xyz/anchor";
import IDL from "../target/idl/squad_x.json";
import { SquadX } from "../target/types/squad_x";
const provider = anchor.AnchorProvider.env()
export const PROGRAM_PUBKEY = new anchor.web3.PublicKey("AkZczmmb36SNeNWGBTh5nLrzNHGizLwq9ju7c2W56Ebm");


const getProgram = (anchorProvider: anchor.AnchorProvider = provider) => {
	return new anchor.Program<SquadX>(IDL as any, PROGRAM_PUBKEY, provider);
};

const toPubkey = (publicKeyOrKeypair: anchor.web3.PublicKey | anchor.web3.Keypair) : anchor.web3.PublicKey => {
	return publicKeyOrKeypair instanceof anchor.web3.Keypair ? publicKeyOrKeypair.publicKey : publicKeyOrKeypair;
}


export const program = getProgram();



export interface UserSeeds {
	signer : anchor.web3.Keypair | anchor.web3.PublicKey
};

export interface AvatarSeeds {
	user : anchor.web3.Keypair | anchor.web3.PublicKey
};

export interface SquadSeeds {
	user : anchor.web3.Keypair | anchor.web3.PublicKey
};

export const deriveUser = (
	seeds : UserSeeds) : anchor.web3.PublicKey => {
	const [pubkey, bump] = anchor.web3.PublicKey.findProgramAddressSync(
		[
			Buffer.from("USER"),
			toPubkey(seeds.signer).toBuffer()
		],
		PROGRAM_PUBKEY
	)
	return pubkey
};

export const deriveAvatar = (
	seeds : AvatarSeeds) : anchor.web3.PublicKey => {
	const [pubkey, bump] = anchor.web3.PublicKey.findProgramAddressSync(
		[
			Buffer.from("AVATAR"),
			toPubkey(seeds.user).toBuffer()
		],
		PROGRAM_PUBKEY
	)
	return pubkey
};

export const deriveSquad = (
	seeds : SquadSeeds) : anchor.web3.PublicKey => {
	const [pubkey, bump] = anchor.web3.PublicKey.findProgramAddressSync(
		[
			Buffer.from("SQUAD"),
			toPubkey(seeds.user).toBuffer()
		],
		PROGRAM_PUBKEY
	)
	return pubkey
};

export const fetchUser = (
	address: anchor.web3.PublicKey,
) => {
	return program.account.user.fetch(address)
};
export const fetchAvatar = (
	address: anchor.web3.PublicKey,
) => {
	return program.account.avatar.fetch(address)
};
export const fetchSquad = (
	address: anchor.web3.PublicKey,
) => {
	return program.account.squad.fetch(address)
};

export async function CreateUserAccountSendAndConfirm(
	display_name : string,
	
	user_seed_signer : anchor.web3.PublicKey,
	user: anchor.web3.PublicKey,
	
	fee_payer : anchor.web3.PublicKey | anchor.web3.Keypair
){
	const createUserAccountSigners = [
		fee_payer
	];

	const createUserAccountAccountInputs = {
		user: user,
		systemProgram: new anchor.web3.PublicKey("11111111111111111111111111111111"),
		feePayer: toPubkey(fee_payer),
	};

	const createUserAccountsignerKeypairs = createUserAccountSigners.filter(
		(signer): signer is anchor.web3.Keypair => signer instanceof anchor.web3.Keypair
	);
	

	const createUserAccountBuilder = program.methods
	.createUserAccount(display_name,user_seed_signer)
	.accounts(createUserAccountAccountInputs);
	if (createUserAccountsignerKeypairs.length > 0) {
		createUserAccountBuilder.signers(createUserAccountsignerKeypairs);
	}
	return createUserAccountBuilder.rpc();
}

export function CreateUserAccount(
	display_name : string,
	
	user_seed_signer : anchor.web3.PublicKey,
	user: anchor.web3.PublicKey,
	
	fee_payer : anchor.web3.PublicKey | anchor.web3.Keypair
){

	const createUserAccountAccountInputs = {
		user: user,
		systemProgram: new anchor.web3.PublicKey("11111111111111111111111111111111"),
		feePayer: toPubkey(fee_payer),
	};

	return program.methods
	.createUserAccount(display_name,user_seed_signer)
	.accounts(createUserAccountAccountInputs)
	.instruction();
}


export async function CreateAvatarAccountSendAndConfirm(
	author_seed_signer : anchor.web3.PublicKey,
	author: anchor.web3.PublicKey,
	
	fee_payer : anchor.web3.PublicKey | anchor.web3.Keypair
){
	const avatar = deriveAvatar({
		user: author});;
	const createAvatarAccountSigners = [
		fee_payer
	];

	const createAvatarAccountAccountInputs = {
		author: author,
		avatar: avatar,
		systemProgram: new anchor.web3.PublicKey("11111111111111111111111111111111"),
		feePayer: toPubkey(fee_payer),
	};

	const createAvatarAccountsignerKeypairs = createAvatarAccountSigners.filter(
		(signer): signer is anchor.web3.Keypair => signer instanceof anchor.web3.Keypair
	);
	

	const createAvatarAccountBuilder = program.methods
	.createAvatarAccount(author_seed_signer)
	.accounts(createAvatarAccountAccountInputs);
	if (createAvatarAccountsignerKeypairs.length > 0) {
		createAvatarAccountBuilder.signers(createAvatarAccountsignerKeypairs);
	}
	return createAvatarAccountBuilder.rpc();
}

export function CreateAvatarAccount(
	author_seed_signer : anchor.web3.PublicKey,
	author: anchor.web3.PublicKey,
	
	fee_payer : anchor.web3.PublicKey | anchor.web3.Keypair
){
	const avatar = deriveAvatar({
		user: author});;

	const createAvatarAccountAccountInputs = {
		author: author,
		avatar: avatar,
		systemProgram: new anchor.web3.PublicKey("11111111111111111111111111111111"),
		feePayer: toPubkey(fee_payer),
	};

	return program.methods
	.createAvatarAccount(author_seed_signer)
	.accounts(createAvatarAccountAccountInputs)
	.instruction();
}


export async function CreateSquadAccountSendAndConfirm(
	display_name : string,
	
	motto : string,
	
	author_seed_signer : anchor.web3.PublicKey,
	author: anchor.web3.PublicKey,
	
	fee_payer : anchor.web3.PublicKey | anchor.web3.Keypair
){
	const squad = deriveSquad({
		user: author});;
	const createSquadAccountSigners = [
		fee_payer
	];

	const createSquadAccountAccountInputs = {
		author: author,
		squad: squad,
		systemProgram: new anchor.web3.PublicKey("11111111111111111111111111111111"),
		feePayer: toPubkey(fee_payer),
	};

	const createSquadAccountsignerKeypairs = createSquadAccountSigners.filter(
		(signer): signer is anchor.web3.Keypair => signer instanceof anchor.web3.Keypair
	);
	

	const createSquadAccountBuilder = program.methods
	.createSquadAccount(display_name,motto,author_seed_signer)
	.accounts(createSquadAccountAccountInputs);
	if (createSquadAccountsignerKeypairs.length > 0) {
		createSquadAccountBuilder.signers(createSquadAccountsignerKeypairs);
	}
	return createSquadAccountBuilder.rpc();
}

export function CreateSquadAccount(
	display_name : string,
	
	motto : string,
	
	author_seed_signer : anchor.web3.PublicKey,
	author: anchor.web3.PublicKey,
	
	fee_payer : anchor.web3.PublicKey | anchor.web3.Keypair
){
	const squad = deriveSquad({
		user: author});;

	const createSquadAccountAccountInputs = {
		author: author,
		squad: squad,
		systemProgram: new anchor.web3.PublicKey("11111111111111111111111111111111"),
		feePayer: toPubkey(fee_payer),
	};

	return program.methods
	.createSquadAccount(display_name,motto,author_seed_signer)
	.accounts(createSquadAccountAccountInputs)
	.instruction();
}

