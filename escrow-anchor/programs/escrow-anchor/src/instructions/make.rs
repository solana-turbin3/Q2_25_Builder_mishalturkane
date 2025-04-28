use anchor_lang::prelude::*;

use anchor_spl::{
    associated_token::AssociatedToken,
    token_interface::{
        TokenAccount,
        TokenInterface,
        Mint,
        TransferChecked,
        transfer_checked
    }
};



pub use crate::state::escrow_state::Escrow;

#[derive(Accounts)]
pub struct Make<'info>{
    #[account(mut)]
    pub make: Signer<'info>,
   
   
    #[account(
        mint::token_program = token_program
    )]
    pub mint_a: InterfaceAccount<'info,Mint>,

    #[account(
        mint::token_program = token_program
    )]
    pub mint_b: InterfaceAccount<'info,Mint>,  

    #[account(
        mut,
        associated_token::mint = mint_a,
        associated_token::authority = make,
        associated_token:: token_program = token_program

    )]
    pub make_ata_a: InterfaceAccount<'info, TokenAccount>,

    #[account(
        init,
        payer = maker,
        seeds = [b"escrow", maker.key().as_ref(), seed.to_le_bytes().as_ref()],
        bump,
        space = 8 + Escrow::INIT_SPACE
    )]
    pub escrow: Account<'info,Escrow>,

    
    pub token_program: Interface<'info, TokenInterface>,
}