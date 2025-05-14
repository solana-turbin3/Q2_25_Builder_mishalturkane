use anchor_lang::prelude::*;
use crate::Merchant;

#[derive(Accounts)]
pub struct InitMerchant<'info> {
    #[account(
        init,
        seeds = [b"merchant", authority.key().as_ref()],
        bump,
        payer = authority,
        space = Merchant::INIT_SPACE
    )]
    pub merchant_account: Account<'info, Merchant>,

    #[account(mut)]
    pub authority: Signer<'info>,

    pub system_program: Program<'info, System>,
}

impl<'info> InitMerchant<'info> {
    pub fn initialize_merchant(
        ctx: Context<InitMerchant<'info>>,
        name: String,
        category: String
    ) -> Result<()> {
        let merchant_account = &mut ctx.accounts.merchant_account;

        // Assigning the merchant's details to the account
        merchant_account.merchant = *ctx.accounts.authority.key;
        merchant_account.name = name;
        merchant_account.category = category;

        msg!("Merchant account created successfully for {}", merchant_account.name);

        Ok(())
    }
}