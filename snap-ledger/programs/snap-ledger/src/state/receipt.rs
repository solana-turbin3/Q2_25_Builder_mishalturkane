use anchor_lang::prelude::*;

#[account]
pub struct Receipt {
    pub customer: Pubkey,      // 32 bytes
    pub merchant: Pubkey,      // 32 bytes
    pub timestamp: i64,        // 8 bytes
    pub item_name: String,          // 4 bytes (length prefix) + length of the string
    pub item_description: String,   // 4 bytes (length prefix) + length of the string
    pub item_price: f64,            // 8 bytes
}


impl Space for Receipt {
    const INIT_SPACE: usize = 8    // Anchor discriminator
        + 32                           // customer (Pubkey)
        + 32                           // merchant (Pubkey)
        + 8                            // timestamp (i64)
        + 4 + 32                       // name (string prefix + data)
        + 4 + 32                       // description (string prefix + data)
        + 8;                           // price (u64)
}
