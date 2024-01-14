import * as anchor from "@coral-xyz/anchor";
import { Program } from "@coral-xyz/anchor";
import IDL from "../target/idl/budget_tracker.json";
import { BudgetTracker } from "../target/types/budget_tracker";
const provider = anchor.AnchorProvider.env()
export const PROGRAM_PUBKEY = new anchor.web3.PublicKey("6MMqsc29cPYM2Gdh6DJY9canWqtSLiezTCaerhSa8N7c");


const getProgram = (anchorProvider: anchor.AnchorProvider = provider) => {
	return new anchor.Program<BudgetTracker>(IDL as any, PROGRAM_PUBKEY, provider);
};

const toPubkey = (publicKeyOrKeypair: anchor.web3.PublicKey | anchor.web3.Keypair) : anchor.web3.PublicKey => {
	return publicKeyOrKeypair instanceof anchor.web3.Keypair ? publicKeyOrKeypair.publicKey : publicKeyOrKeypair;
}


export const program = getProgram();



export interface RecordSeeds {
	signer : anchor.web3.Keypair | anchor.web3.PublicKey
};

export const deriveRecord = (
	seeds : RecordSeeds) : anchor.web3.PublicKey => {
	const [pubkey, bump] = anchor.web3.PublicKey.findProgramAddressSync(
		[
			Buffer.from("record"),
			toPubkey(seeds.signer).toBuffer()
		],
		PROGRAM_PUBKEY
	)
	return pubkey
};

export const fetchRecord = (
	address: anchor.web3.PublicKey,
) => {
	return program.account.record.fetch(address)
};

export async function CreateUserRecordSendAndConfirm(
	user_name : string,
	
	user_record_seed_signer : anchor.web3.PublicKey,
	user_record: anchor.web3.PublicKey,
	
	fee_payer : anchor.web3.PublicKey | anchor.web3.Keypair
){
	const createUserRecordSigners = [
		fee_payer
	];

	const createUserRecordAccountInputs = {
		userRecord: user_record,
		systemProgram: new anchor.web3.PublicKey("11111111111111111111111111111111"),
		feePayer: toPubkey(fee_payer),
	};

	const createUserRecordsignerKeypairs = createUserRecordSigners.filter(
		(signer): signer is anchor.web3.Keypair => signer instanceof anchor.web3.Keypair
	);
	

	const createUserRecordBuilder = program.methods
	.createUserRecord(user_name,user_record_seed_signer)
	.accounts(createUserRecordAccountInputs);
	if (createUserRecordsignerKeypairs.length > 0) {
		createUserRecordBuilder.signers(createUserRecordsignerKeypairs);
	}
	return createUserRecordBuilder.rpc();
}

export function CreateUserRecord(
	user_name : string,
	
	user_record_seed_signer : anchor.web3.PublicKey,
	user_record: anchor.web3.PublicKey,
	
	fee_payer : anchor.web3.PublicKey | anchor.web3.Keypair
){

	const createUserRecordAccountInputs = {
		userRecord: user_record,
		systemProgram: new anchor.web3.PublicKey("11111111111111111111111111111111"),
		feePayer: toPubkey(fee_payer),
	};

	return program.methods
	.createUserRecord(user_name,user_record_seed_signer)
	.accounts(createUserRecordAccountInputs)
	.instruction();
}

