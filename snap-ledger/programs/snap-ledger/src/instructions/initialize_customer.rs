use anchor_lang::prelude::*;
use crate::Merchant;
use crate::Customer;

#[derive(Accounts)]
#[instruction(name: String, phone: String)]
pub struct InitCustomer<'info> {
    #[account(
        init,
        seeds = [b"customer", merchant.key().as_ref(), customer.key().as_ref()],
        bump,
        payer = authority,
        space = Customer::INIT_SPACE
    )]
    pub customer_account: Account<'info, Customer>,

    #[account(mut)]
    pub merchant: Account<'info, Merchant>,

    /// CHECK: We only read the public key to derive the PDA, no data is accessed.
    pub customer: UncheckedAccount<'info>,

    #[account(mut)]
    pub authority: Signer<'info>, // Must match merchant.authority

    pub system_program: Program<'info, System>,
}
pub fn initialize_customer(ctx: Context<InitCustomer>, name: String, phone: String) -> Result<()> {
    let customer_account = &mut ctx.accounts.customer_account;

    customer_account.customer = ctx.accounts.customer.key();
    customer_account.name = name;
    customer_account.phone = phone;
    customer_account.authority = ctx.accounts.authority.key();

    Ok(())
}
