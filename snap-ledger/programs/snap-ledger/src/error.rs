use anchor_lang::prelude::*;

#[error_code]
pub enum ErrorCode {
    #[msg("Custom error message")]
    CustomError,

    #[msg("The bill amount does not match the recorded amount.")]
    BillAmountMismatch,

    #[msg("The merchant is not authorized to collect this payment.")]
    UnauthorizedMerchant,

    #[msg("The receipt has expired.")]
    ReceiptExpired,
}
