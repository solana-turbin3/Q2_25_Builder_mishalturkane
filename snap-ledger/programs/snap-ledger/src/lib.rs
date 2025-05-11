pub mod constants;
pub mod error;
pub mod instructions;
pub mod state;

use anchor_lang::prelude::*;

pub use constants::*;
pub use instructions::*;
pub use state::*;


declare_id!("HTSux5BxmbmS9t16MCyUnFG2bkTkQjboEpLrTRSYhqBo");

#[program]
pub mod snap_ledger {
    use super::*;

    pub fn initialize_merchant(ctx: Context<InitMerchant>, name: String, category: String) -> Result<()> {
        initialize_merchant::initialize_merchant(ctx, name, category)
    }

    pub fn initialize_customer(ctx: Context<InitCustomer> ,name: String, phone: String) -> Result<()>{
        initialize_customer::initialize_customer(ctx, name, phone)
    }

    pub fn initialize_receipt(ctx: Context<InitReceipt>, name: String ,description: String,price:f64) -> Result<()>{
        initialize_receipt::initialize_receipt(ctx, name, description, price)
    }

    pub fn pay_bill(ctx: Context<PayBill>, amount: f64) -> Result<()>{
        pay_bill::pay_bill(ctx, amount)
    }
    
}
