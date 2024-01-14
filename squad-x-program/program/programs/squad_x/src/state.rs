use anchor_lang::prelude::*;
#[account]
pub struct User {
    pub display_name: String,
    pub xp: u16,
    pub badge: String,
    pub avatar: Pubkey,
    pub squad: Pubkey,
}

#[account]
pub struct Avatar {
    pub damage: u8,
    pub energy: u8,
    pub xp: u16,
    pub authority: Pubkey,
}

#[account]
pub struct Squad {
    pub display_name: String,
    pub motto: String,
    pub members: u16,
    pub xp: u16,
    pub badge: String,
    pub authority: Pubkey,
}
