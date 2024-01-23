// This file is auto-generated from the CIDL source.
// Editing this file directly is not recommended as it may be overwritten.

use std::str::FromStr;
use borsh::BorshSerialize;
use solana_program::account_info::{AccountInfo, next_account_info, next_account_infos};
use solana_program::borsh0_10::try_from_slice_unchecked;
use solana_program::entrypoint::ProgramResult;
use solana_program::program::{invoke, invoke_signed};
use solana_program::pubkey::Pubkey;
use solana_program::rent::Rent;
use solana_program::system_instruction::create_account;
use solana_program::{msg, system_program};
use solana_program::sysvar::Sysvar;
use solana_program::program_pack::Pack;
use crate::generated::errors::SquadXError;
use crate::generated::instructions::SquadXInstruction;

use crate::generated::state::{
	Account,
	AccountPDA,
	Users,
	Squads,
	Quests,
};
use crate::src::*;

pub struct Processor;

impl Processor {
    pub fn process(
        program_id: &Pubkey,
        accounts: &[AccountInfo],
        data: &[u8],
    ) -> ProgramResult {
        let instruction = SquadXInstruction::unpack(data)?;

        match instruction {
			SquadXInstruction::CreateUserAccount(args) => {
				msg!("Instruction: CreateUserAccount");
				Self::process_create_user_account(
					program_id,
					accounts, 
					args.display_name,
					args.user_seed_signer,
				)
			}
			SquadXInstruction::CreateSquadAccount(args) => {
				msg!("Instruction: CreateSquadAccount");
				Self::process_create_squad_account(
					program_id,
					accounts, 
					args.display_name,
					args.motto,
					args.author_seed_signer,
				)
			}
        }
    }

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
	pub fn process_create_user_account(
		program_id: &Pubkey,
		accounts: &[AccountInfo],
		display_name: String,
		user_seed_signer: Pubkey,
	) -> ProgramResult {
		let account_info_iter = &mut accounts.iter();
		let fee_payer_info = next_account_info(account_info_iter)?;
		let user_info = next_account_info(account_info_iter)?;
		let system_program_info = next_account_info(account_info_iter)?;

		// Derive PDAs
		let (user_pubkey, user_bump) = Pubkey::find_program_address(
			&[b"USERS", user_seed_signer.as_ref()],
			program_id,
		);

		// Security Checks
		if fee_payer_info.is_signer != true {
			return Err(SquadXError::InvalidSignerPermission.into());
		}

		if *user_info.key != user_pubkey {
			return Err(SquadXError::NotExpectedAddress.into());
		}

		if *system_program_info.key != Pubkey::from_str("11111111111111111111111111111111").unwrap() {
			return Err(SquadXError::NotExpectedAddress.into());
		}


		// Accounts Initializations
		let space = Users::LEN;
		let rent = Rent::get()?;
		let rent_minimum_balance = rent.minimum_balance(space);

		invoke_signed(
			&create_account(
				&fee_payer_info.key,
				&user_info.key,
				rent_minimum_balance,
				space as u64,
				program_id,
			),
			&[fee_payer_info.clone(), user_info.clone()],
			&[&[b"USERS", user_seed_signer.as_ref(), &[user_bump]]],
		)?;


		// Security Checks
		if *fee_payer_info.owner != Pubkey::from_str("11111111111111111111111111111111").unwrap() {
			return Err(SquadXError::WrongAccountOwner.into());
		}

		if user_info.data_len() != Users::LEN {
			return Err(SquadXError::InvalidAccountLen.into());
		}


		// Accounts Deserialization
		let user = &mut AccountPDA::new(
			&user_info,
			try_from_slice_unchecked::<Users>(&user_info.data.borrow()).unwrap(),
			user_bump,
		);

		// Calling STUB
		create_user_account::create_user_account(
			program_id,
			user,
			display_name,
		)?;

		// Accounts Serialization
		user.data.serialize(&mut &mut user_info.data.borrow_mut()[..])?;
		
		Ok(())
	}

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
	pub fn process_create_squad_account(
		program_id: &Pubkey,
		accounts: &[AccountInfo],
		display_name: String,
		motto: String,
		author_seed_signer: Pubkey,
	) -> ProgramResult {
		let account_info_iter = &mut accounts.iter();
		let fee_payer_info = next_account_info(account_info_iter)?;
		let author_info = next_account_info(account_info_iter)?;
		let squad_info = next_account_info(account_info_iter)?;
		let system_program_info = next_account_info(account_info_iter)?;

		// Derive PDAs
		let (author_pubkey, author_bump) = Pubkey::find_program_address(
			&[b"USERS", author_seed_signer.as_ref()],
			program_id,
		);
		let (squad_pubkey, squad_bump) = Pubkey::find_program_address(
			&[b"SQUADS", author_info.key.as_ref()],
			program_id,
		);

		// Security Checks
		if fee_payer_info.is_signer != true {
			return Err(SquadXError::InvalidSignerPermission.into());
		}

		if *author_info.key != author_pubkey {
			return Err(SquadXError::NotExpectedAddress.into());
		}

		if *squad_info.key != squad_pubkey {
			return Err(SquadXError::NotExpectedAddress.into());
		}

		if *system_program_info.key != Pubkey::from_str("11111111111111111111111111111111").unwrap() {
			return Err(SquadXError::NotExpectedAddress.into());
		}


		// Accounts Initializations
		let space = Squads::LEN;
		let rent = Rent::get()?;
		let rent_minimum_balance = rent.minimum_balance(space);

		invoke_signed(
			&create_account(
				&fee_payer_info.key,
				&squad_info.key,
				rent_minimum_balance,
				space as u64,
				program_id,
			),
			&[fee_payer_info.clone(), squad_info.clone()],
			&[&[b"SQUADS", author_info.key.as_ref(), &[squad_bump]]],
		)?;


		// Security Checks
		if *fee_payer_info.owner != Pubkey::from_str("11111111111111111111111111111111").unwrap() {
			return Err(SquadXError::WrongAccountOwner.into());
		}

		if author_info.data_len() != Users::LEN {
			return Err(SquadXError::InvalidAccountLen.into());
		}

		if squad_info.data_len() != Squads::LEN {
			return Err(SquadXError::InvalidAccountLen.into());
		}


		// Accounts Deserialization
		let author = AccountPDA::new(
			&author_info,
			try_from_slice_unchecked::<Users>(&author_info.data.borrow()).unwrap(),
			author_bump,
		);
		let squad = &mut AccountPDA::new(
			&squad_info,
			try_from_slice_unchecked::<Squads>(&squad_info.data.borrow()).unwrap(),
			squad_bump,
		);

		// Calling STUB
		create_squad_account::create_squad_account(
			program_id,
			&author,
			squad,
			display_name,
			motto,
		)?;

		// Accounts Serialization
		squad.data.serialize(&mut &mut squad_info.data.borrow_mut()[..])?;
		
		Ok(())
	}
}