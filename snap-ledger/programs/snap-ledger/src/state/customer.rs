use anchor_lang::prelude::*;

#[account]
pub struct Customer{
    pub customer: Pubkey,     // The customer's wallet address
    pub name: String,         // Customer name
    pub phone: String,        // Contact number
    pub authority: Pubkey,    // The merchant who created this customer
}

impl Space for Customer{
   const INIT_SPACE: usize = 8
    + 32              // customer
    + 4 + 32          // name
    + 4 + 15          // phone
    + 32;             // authority

}

