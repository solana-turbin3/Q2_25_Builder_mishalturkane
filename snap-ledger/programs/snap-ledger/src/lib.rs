pub mod constants;
pub mod error;
pub mod instructions;
pub mod state;

use anchor_lang::prelude::*;

pub use constants::*;
pub use instructions::*;
pub use state::*;

declare_id!("4M1ztMqBFjsZnhoTN1kbrKGzbNwRPSg64DQFgMKDorSw");

#[program]
pub mod snap_ledger {
    use super::*;

    pub fn initialize_merchant(ctx: Context<InitMerchant>, name: String, category: String) -> Result<()> {
        instructions::InitMerchant::initialize_merchant(ctx, name, category)
    }
  pub fn initialize_customer(ctx: Context<InitCustomer> ,name: String, phone: String) -> Result<()>{
        instructions::InitCustomer::initialize_customer(ctx, name, phone)
    }

    pub fn initialize_receipt(ctx: Context<InitReceipt>, name: String ,description: String,price:f64) -> Result<()>{
        instructions::InitReceipt::initialize_receipt(ctx, name, description, price)
    }

    pub fn pay_bill(ctx: Context<PayBill>, amount: f64) -> Result<()>{
      instructions::PayBill::pay_bill(ctx, amount)
        
    }
  
    
}
