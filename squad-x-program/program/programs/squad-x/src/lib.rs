use anchor_lang::prelude::*;

declare_id!("243dp7ej927Q19rt7NezVaHiEGxC9Lqfz4fgGS2WaZM7");

#[program]
mod squad_x {
    use super::*;

    pub fn create_user_account(
        ctx: Context<CreateUserAccount>,
        display_name: String,
        badge: String,
    ) -> Result<()> {
        let user = &mut ctx.accounts.user;
        user.display_name = display_name;
        user.level = 1;
        user.badge = badge;

        Ok(())
    }

    pub fn join_squad(ctx: Context<JoinSquad>) -> Result<()> {
        let user = &mut ctx.accounts.user;
        let squad = &mut ctx.accounts.squad;

        require!(
            ctx.accounts.system_program.key() != user.squad.key(),
            Error::AlreadyJoinedSquad
        );

        user.squad = squad.key();
        squad.members = squad.members + 1;

        Ok(())
    }

    pub fn create_squad(
        ctx: Context<CreateSquadAccount>,
        display_name: String,
        motto: String,
        badge: String,
    ) -> Result<()> {
        let squad = &mut ctx.accounts.squad;
        let user = &mut ctx.accounts.user;
        squad.display_name = display_name;
        squad.motto = motto;
        squad.badge = badge;
        squad.level = 1;
        squad.members = 1;
        squad.owner = ctx.accounts.signer.key();

        user.squad = squad.key();

        Ok(())
    }
}

#[derive(Accounts)]
pub struct CreateUserAccount<'info> {
    #[account(
        init,
        payer = signer,
        seeds = [b"USERS", signer.key().as_ref()],
        bump,
        space = 8 + 256 + 2 + 256 + 32
    )]
    pub user: Account<'info, Users>,

    #[account(mut)]
    pub signer: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct JoinSquad<'info> {
    #[account(mut)]
    pub user: Account<'info, Users>,

    #[account(mut)]
    pub squad: Account<'info, Squads>,

    #[account(mut)]
    pub signer: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct CreateSquadAccount<'info> {
    #[account(
        init,
        payer = signer,
        seeds = [b"SQUADS", signer.key().as_ref()],
        bump,
        space = 8 + 256 + 256 + 1 + 1 + 256 + 32,
    )]
    pub squad: Account<'info, Squads>,

    #[account(mut)]
    pub user: Account<'info, Users>,

    #[account(mut)]
    pub signer: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[account]
pub struct Users {
    pub display_name: String,
    pub level: u8,
    pub badge: String,
    pub squad: Pubkey,
}

#[account]
pub struct Squads {
    pub display_name: String,
    pub motto: String,
    pub level: u8,
    pub members: u8,
    pub badge: String,
    pub owner: Pubkey,
}

#[error_code]
pub enum Error {
    #[msg("Already joined squad!")]
    AlreadyJoinedSquad,
}
