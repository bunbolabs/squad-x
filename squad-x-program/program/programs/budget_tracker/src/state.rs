use anchor_lang::prelude::*;
#[account]
pub struct Record {
    pub name: String,
}
