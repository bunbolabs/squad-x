use solana_program::account_info::AccountInfo;
use solana_program::entrypoint::ProgramResult;
use solana_program::pubkey::Pubkey;

use crate::generated::state::{
	AccountPDA,
	Squads,
	Users,
};


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
pub fn create_squad_account(
	program_id: &Pubkey,
	author: &AccountPDA<Users>,
	squad: &mut AccountPDA<Squads>,
	display_name: String,
	motto: String,
) -> ProgramResult {
    // Implement your business logic here...






    Ok(())
}