#![allow(unused)]
use anchor_lang::prelude::*;
use std::str::FromStr;
pub mod stubs;
pub use stubs::*;
pub mod state;
pub use state::*;

declare_id!("AkZczmmb36SNeNWGBTh5nLrzNHGizLwq9ju7c2W56Ebm");

#[program]
pub mod squad_x {
    use super::*;

    pub fn create_user_account(
        ctx: Context<CreateUserAccount>,
        display_name: String,
        user_seed_signer: Pubkey,
    ) -> Result<()> {
        stubs::create_user_account::create_user_account(ctx, display_name)
    }

    #[derive(Accounts)]
    #[instruction(display_name:String, user_seed_signer:Pubkey)]
    pub struct CreateUserAccount<'info> {
        /// CHECK: fee_payer requires an account info
        #[account(mut, signer)]
        pub fee_payer: AccountInfo<'info>,
        #[account(init, space=214, payer=fee_payer, seeds = [b"USER", user_seed_signer.key().as_ref()], bump)]
        pub user: Account<'info, User>,

        /// CHECK: system_program requires an account info
        pub system_program: AccountInfo<'info>,
    }

    pub fn create_avatar_account(
        ctx: Context<CreateAvatarAccount>,
        author_seed_signer: Pubkey,
    ) -> Result<()> {
        stubs::create_avatar_account::create_avatar_account(ctx)
    }

    #[derive(Accounts)]
    #[instruction(author_seed_signer:Pubkey)]
    pub struct CreateAvatarAccount<'info> {
        /// CHECK: fee_payer requires an account info
        #[account(mut, signer)]
        pub fee_payer: AccountInfo<'info>,
        #[account(seeds = [b"USER", author_seed_signer.key().as_ref()], bump)]
        pub author: Account<'info, User>,
        #[account(init, space=44, payer=fee_payer, seeds = [b"AVATAR", author.key().as_ref()], bump)]
        pub avatar: Account<'info, Avatar>,

        /// CHECK: system_program requires an account info
        pub system_program: AccountInfo<'info>,
    }

    pub fn create_squad_account(
        ctx: Context<CreateSquadAccount>,
        display_name: String,
        motto: String,
        author_seed_signer: Pubkey,
    ) -> Result<()> {
        stubs::create_squad_account::create_squad_account(ctx, display_name, motto)
    }

    #[derive(Accounts)]
    #[instruction(display_name:String, motto:String, author_seed_signer:Pubkey)]
    pub struct CreateSquadAccount<'info> {
        /// CHECK: fee_payer requires an account info
        #[account(mut, signer)]
        pub fee_payer: AccountInfo<'info>,
        #[account(seeds = [b"USER", author_seed_signer.key().as_ref()], bump)]
        pub author: Account<'info, User>,
        #[account(init, space=443, payer=fee_payer, seeds = [b"SQUAD", author.key().as_ref()], bump)]
        pub squad: Account<'info, Squad>,

        /// CHECK: system_program requires an account info
        pub system_program: AccountInfo<'info>,
    }
}
