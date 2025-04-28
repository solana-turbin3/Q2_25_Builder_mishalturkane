use anchor_lang::prelude::*;

declare_id!("55vfd2htikDeCfgQrLdW4r1tHDettRK9VMJYwFMjB72p");

#[program]
pub mod escrow_anchor {
    use super::*;

    pub fn initialize(ctx: Context<Initialize>) -> Result<()> {
        msg!("Greetings from: {:?}", ctx.program_id);
        Ok(())
    }
}

#[derive(Accounts)]
pub struct Initialize {}
