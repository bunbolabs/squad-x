#![allow(unused)]
use anchor_lang::prelude::*;
use std::str::FromStr;
pub mod stubs;
pub use stubs::*;
pub mod state;
pub use state::*;



declare_id!("6MMqsc29cPYM2Gdh6DJY9canWqtSLiezTCaerhSa8N7c");

#[program]
pub mod budget_tracker {
    use super::*;
    
    pub fn create_user_record(ctx: Context<CreateUserRecord>,user_name:String, user_record_seed_signer:Pubkey) -> Result<()> {
        stubs::create_user_record::create_user_record(ctx,user_name)}

    #[derive(Accounts)]
    #[instruction(user_name:String, user_record_seed_signer:Pubkey)]
    pub struct CreateUserRecord<'info>{
        
        
	/// CHECK: fee_payer requires an account info
	#[account(mut, signer)]
	pub fee_payer : AccountInfo<'info>,
        #[account(init_if_needed, space=62, payer=fee_payer, seeds = [b"record", user_record_seed_signer.key().as_ref()], bump)]
	pub user_record: Account<'info,Record>,
        
	/// CHECK: system_program requires an account info
	
	pub system_program : AccountInfo<'info>,}

}
