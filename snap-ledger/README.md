# Snap-Ledger
   Decentralized billing and payment system for grocery stores, jewelry shops, and retailers.


- [LOI](https://drive.google.com/file/d/1wddBJg6hhf1RyDO8-4cg022pYHrjt1UT/view?usp=drive_link)
- [User Stories](https://drive.google.com/file/d/1N8JoGFYLxS5q9EFpGWUFtQKNQQaTl_mI/view?usp=drive_link)
- [Arch Diagram](https://drive.google.com/file/d/1FeGMniJcwng4vjaIi-iUhED9kEeq-WVK/view?usp=drive_link)
- [Deploed Contracct](https://explorer.solana.com/address/4M1ztMqBFjsZnhoTN1kbrKGzbNwRPSg64DQFgMKDorSw?cluster=devnet)

---

## Project Structure
This command creates a multi-program Anchor workspace (snap-ledger) with built-in support for error handling, **state** and **instruction management**, and **testing—ideal** for building complex dApps with multiple smart contracts.

```bash 
anchor init snap-ledger --template multiple
```
---
### 1 Account Structure 
These define data storage on Solana.
- ``` merchant.rs ``` Defines the Merchant struct that holds data related to the merchant, like name, wallet address, total sales, etc.

``` bash
 #[account]
 pub struct Merchant {
    pub merchant: Pubkey,    
    pub authority: Pubkey,  
    pub name: String,        
    pub category: String,     
}  

```

- ``` customer.rs ``` Defines the Customer struct which stores customer-related information such as wallet, balance, or past purchases.


``` bash

#[account]
pub struct Customer{
    pub customer: Pubkey,     
    pub name: String,         
    pub phone: String,        
    pub authority: Pubkey,   
}


```

- ``` receipt.rs ``` Defines the Receipt struct to store transaction details between customer and merchant — like bill amount, timestamp, and payment status.


``` bash
#[account]
pub struct Receipt {
    pub customer: Pubkey,      
    pub merchant: Pubkey,     
    pub item_name: String,          
    pub item_description: String,  
    pub item_price: f64,            
}
```
---

### 2 Instructions
These handle transactions and interactions with the smart contract.

- ``` initialize_merchant.rs ``` Initializes a merchant account with a unique PDA for secure identification.
``` bash
  #[account(
        init,
        seeds = [b"merchant", authority.key().as_ref()],
        bump,
        payer = authority,
        space = Merchant::INIT_SPACE
    )]
    pub merchant_account: Account<'info, Merchant>,

```

- ``` initialize_customer.rs ``` Initializes a customer account with a unique PDA for secure identification.
``` bash
 #[account(
        init,
        seeds = [b"customer", merchant.key().as_ref(), customer.key().as_ref()],
        bump,
        payer = authority,
        space = Customer::INIT_SPACE
    )]
    pub customer_account: Account<'info, Customer>, 

```


- ``` initialize_receipt.rs ``` Initializes a receipt account with a unique PDA for secure identification.

``` bash
    #[account(
        init,
        seeds = [b"receipt", merchant.key().as_ref(), customer.key().as_ref()],
        bump,
        payer = authority,
        space = Receipt::INIT_SPACE
    )]
    pub receipt: Account<'info, Receipt>,
```
- ``` pay_bill.rs ``` instruction likely handles the bill payment process. 
---


## Progress: 
- Smartcontract ✅
- Testing ✅
- Frontend 🏗️
- ### Future Roadmap
   - Implement PDF Bill Generation
   - Develop Merchant Analytics Dashboard
---
## Test Cases Passed ✅
