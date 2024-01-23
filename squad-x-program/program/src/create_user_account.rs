use solana_program::account_info::AccountInfo;
use solana_program::entrypoint::ProgramResult;
use solana_program::pubkey::Pubkey;

use crate::generated::state::{
	AccountPDA,
	Users,
};


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
pub fn create_user_account(
	program_id: &Pubkey,
	user: &mut AccountPDA<Users>,
	display_name: String,
) -> ProgramResult {
    // Implement your business logic here...






    Ok(())
}