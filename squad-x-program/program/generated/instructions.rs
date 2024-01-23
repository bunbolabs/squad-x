// This file is auto-generated from the CIDL source.
// Editing this file directly is not recommended as it may be overwritten.

use borsh::{BorshDeserialize, BorshSerialize};
use solana_program::program_error::ProgramError;
use solana_program::pubkey::Pubkey;
use crate::generated::errors::SquadXError;

#[derive(BorshSerialize, Debug)]
pub enum SquadXInstruction {
/// Create new user account.
///
/// Accounts:
/// 0. `[writable, signer]` fee_payer: [AccountInfo] Auto-generated, default fee payer
/// 1. `[writable]` user: [Users] 
/// 2. `[]` system_program: [AccountInfo] Auto-generated, for account initialization
///
/// Data:
/// - display_name: [String] 
/// - user_seed_signer: [Pubkey] Auto-generated, from input user of type [Users] set the seed named signer, required by the type
	CreateUserAccount(CreateUserAccountArgs),

/// Create new squad account.
///
/// Accounts:
/// 0. `[writable, signer]` fee_payer: [AccountInfo] Auto-generated, default fee payer
/// 1. `[]` author: [Users] 
/// 2. `[writable]` squad: [Squads] 
/// 3. `[]` system_program: [AccountInfo] Auto-generated, for account initialization
///
/// Data:
/// - display_name: [String] 
/// - motto: [String] 
/// - author_seed_signer: [Pubkey] Auto-generated, from input author of type [Users] set the seed named signer, required by the type
	CreateSquadAccount(CreateSquadAccountArgs),

}

#[derive(BorshSerialize, BorshDeserialize, Debug)]
pub struct CreateUserAccountArgs {
	pub display_name: String,
	pub user_seed_signer: Pubkey,
}

#[derive(BorshSerialize, BorshDeserialize, Debug)]
pub struct CreateSquadAccountArgs {
	pub display_name: String,
	pub motto: String,
	pub author_seed_signer: Pubkey,
}

impl SquadXInstruction {
    pub fn unpack(input: &[u8]) -> Result<Self, ProgramError> {
        let (&variant, rest) = input.split_first().ok_or(SquadXError::InvalidInstruction)?;

        Ok(match variant {
			0 => Self::CreateUserAccount(CreateUserAccountArgs::try_from_slice(rest).unwrap()),
			1 => Self::CreateSquadAccount(CreateSquadAccountArgs::try_from_slice(rest).unwrap()),
			_ => return Err(SquadXError::InvalidInstruction.into())
        })
    }
}