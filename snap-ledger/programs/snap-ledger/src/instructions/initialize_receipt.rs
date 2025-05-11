use anchor_lang::prelude::*;
use crate::Merchant;
use crate::Receipt;


#[derive(Accounts)]
#[instruction(name: String, description: String, price: u64)]
pub struct InitReceipt<'info> {
    #[account(
        init,
        seeds = [b"receipt", merchant.key().as_ref(), customer.key().as_ref()],
        bump,
        payer = authority,
        space = Receipt::INIT_SPACE
    )]
    pub receipt: Account<'info, Receipt>,

    pub merchant: Account<'info, Merchant>,
    /// CHECK: We only read the public key to derive the PDA, no data is accessed.
    pub customer: UncheckedAccount<'info>,
  

    #[account(mut)]
    pub authority: Signer<'info>,

    pub system_program: Program<'info, System>,
}

pub fn initialize_receipt(
    ctx: Context<InitReceipt>,
    name: String,
    description: String,
    price: f64,
) -> Result<()> {
    let receipt = &mut ctx.accounts.receipt;

    // Set the fields for the receipt account
    receipt.customer = ctx.accounts.customer.key();
    receipt.merchant = ctx.accounts.merchant.key();
    receipt.timestamp = Clock::get()?.unix_timestamp; // Current timestamp
    receipt.item_name = name;  // Item name (e.g., "Gold Chain")
    receipt.item_description = description;  // Item description (e.g., "22K gold, 30 grams")
    receipt.item_price = price;  // Price of the item (e.g., 50000)

    Ok(())
}
