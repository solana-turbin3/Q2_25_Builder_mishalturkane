use anchor_lang::prelude::*;


#[account]
pub struct Merchant {
    pub merchant: Pubkey,     // Store owner ka wallet address
    pub name: String,         // Store ka naam (e.g., "Sharma Grocery")
    pub category: String,     // Store type (e.g., Grocery, Jewelry)
}

impl Space for Merchant {
    const INIT_SPACE: usize = 8    // Anchor discriminator
    + 32                                   // merchant (Pubkey)
    + 4 + 32                               // name (string prefix + data)
    + 4 + 32;                              // category (string prefix + data)
}
