use anchor_lang::prelude::*;


#[account]
pub struct Merchant {
    pub merchant: Pubkey,     // 32 bytes
    pub authority: Pubkey,    // 32 bytes
    pub name: String,         // 4 (length prefix) + string length
    pub category: String,     // 4 (length prefix) + string length
}

impl Space for Merchant {
    const INIT_SPACE: usize = 8    // Anchor discriminator
        + 32                       // merchant
        + 32                       // authority
        + 4 + 32                   // name (max 32 chars)
        + 4 + 32;                  // category (max 32 chars)
}
