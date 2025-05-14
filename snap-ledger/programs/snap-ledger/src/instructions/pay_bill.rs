use anchor_lang::prelude::*;
use anchor_lang::solana_program::sysvar::clock::Clock;
use crate::Receipt;
use crate::Merchant;
use crate::error::ErrorCode;

#[derive(Accounts)]
pub struct PayBill<'info> {
    #[account(mut)]
    pub receipt: Account<'info, Receipt>,
    #[account(mut)]
    pub customer: Signer<'info>, // Customer paying the bill
    #[account(mut)]
    pub merchant: Account<'info, Merchant>, // Merchant receiving the payment
    pub authority: Signer<'info>, // Authority (for validation)
    pub system_program: Program<'info, System>,
}

impl<'info> PayBill<'info> {
    pub fn pay_bill(ctx: Context<PayBill<'info>>, amount: f64) -> Result<()> {
        let receipt = &mut ctx.accounts.receipt;
        let merchant = &ctx.accounts.merchant;

        // Check if the bill amount matches the receipt's amount
        if receipt.item_price != amount as f64 {
            return Err(ErrorCode::BillAmountMismatch.into()); // Custom error
        }

        // Check if the merchant is authorized to collect payment
        if !merchant.authority.eq(&receipt.merchant) {
            return Err(ErrorCode::UnauthorizedMerchant.into()); // Custom error
        }
        Ok(())
    }
}