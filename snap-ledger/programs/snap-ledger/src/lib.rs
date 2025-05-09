pub mod constants;
pub mod error;
pub mod instructions;
pub mod state;

use anchor_lang::prelude::*;

pub use constants::*;
pub use instructions::*;
pub use state::*;


declare_id!("BV5RuoBrTkSyjjUhdYBApY6TyUDsB9xGHWe7by3RnFTg");

#[program]
pub mod snap_ledger {
    use super::*;

    pub fn initialize_merchant(ctx: Context<InitMerchant>, name: String, category: String) -> Result<()> {
        initialize::initialize_merchant(ctx, name, category)
    }
}
