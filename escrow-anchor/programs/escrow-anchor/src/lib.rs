
pub mod instructions;
pub mod state;


use anchor_lang::prelude::*;

pub use instructions::*;
pub use state::*;
pub use make::*;

declare_id!("3LWpKUZnH3HAG9KUrYbVqqJPmN9DmKv8KypsnUDVf4ht");

#[program]
pub mod escrow_anchor {
    use super::*;

    pub fn make(ctx: Context<Make>,seed: u64, deposit: u64, recieve: u64) -> Result<()> {
            ctx.accounts.deposit(deposit)
    }
}
