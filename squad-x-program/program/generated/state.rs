// This file is auto-generated from the CIDL source.
// Editing this file directly is not recommended as it may be overwritten.

use borsh::{BorshDeserialize, BorshSerialize};
use solana_program::account_info::AccountInfo;
use solana_program::pubkey::Pubkey;

#[derive(Clone, Debug)]
pub struct Account<'a, 'b, T> {
    pub data: T,
    pub info: &'a AccountInfo<'b>,
}

#[derive(Clone, Debug)]
pub struct AccountPDA<'a, 'b, T> {
    pub data: T,
    pub info: &'a AccountInfo<'b>,
    pub bump: u8,
}

impl<'a, 'b, T> Account<'a, 'b, T> {
    pub fn new(info: &'a AccountInfo<'b>, data: T) -> Self {
        Self { data, info }
    }
}

impl<'a, 'b, T> AccountPDA<'a, 'b, T> {
    pub fn new(info: &'a AccountInfo<'b>, data: T, bump: u8) -> Self {
        Self { data, info, bump }
    }
}

/// Users data structure
#[derive(BorshSerialize, BorshDeserialize, Debug, Clone, Default)]
pub struct Users {
	pub display_name: String,
	pub xp: u16,
	pub badge: String,
	pub squad: Pubkey,
}

impl Users {
	pub const LEN: usize = 174; 
	}

/// Squads data structure.
#[derive(BorshSerialize, BorshDeserialize, Debug, Clone, Default)]
pub struct Squads {
	pub display_name: String,
	pub motto: String,
	pub members: u16,
	pub xp: u16,
	pub badge: String,
	pub authority: Pubkey,
}

impl Squads {
	pub const LEN: usize = 435; 
	}

/// Quests data structure.
#[derive(BorshSerialize, BorshDeserialize, Debug, Clone, Default)]
pub struct Quests {
	pub name: String,
	pub description: String,
	pub tag: String,
	pub reward: u16,
}

impl Quests {
	pub const LEN: usize = 556; 
	}

