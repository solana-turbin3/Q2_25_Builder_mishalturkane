import * as anchor from "@coral-xyz/anchor";
import { Program } from "@coral-xyz/anchor";
import { SnapLedger } from "../target/types/snap_ledger";
import { expect } from "chai";
import { assert } from "chai";



describe("snap-ledger", () => {
  // Configure the client to use the local cluster.
  const provider = anchor.AnchorProvider.env();
  anchor.setProvider(provider);

  const program = anchor.workspace.snapLedger as Program<SnapLedger>;
  const customer = anchor.web3.Keypair.generate();
  
  const [merchantPda, merchantBump] = anchor.web3.PublicKey.findProgramAddressSync(
    [Buffer.from("merchant"), provider.wallet.publicKey.toBuffer()],
    program.programId
  );

  const [customerPda, customerBump] = anchor.web3.PublicKey.findProgramAddressSync(
    [Buffer.from("customer"), merchantPda.toBuffer(), customer.publicKey.toBuffer()],
    program.programId
  );


  const [receiptPda, receiptBump] = anchor.web3.PublicKey.findProgramAddressSync(
    [Buffer.from("receipt"), merchantPda.toBuffer(), customer.publicKey.toBuffer()],
    program.programId

  );




  it("initialized merchant ✅", async () => {

    // Add your test here.
    const name = "Tanishq Jawelars";
    const category = "Gold Shop";
    const tx = await program.methods.initializeMerchant(name, category)
      .accounts({
        merchantAccount: merchantPda,
        authority: provider.wallet.publicKey,
        systemProgram: anchor.web3.SystemProgram.programId,
      })
      .rpc();


    const merchantAccount = await program.account.merchant.fetch(merchantPda);
    assert.equal(merchantAccount.name, name);
    assert.equal(merchantAccount.category, category);


    console.log("Merchant Account:", merchantAccount);
    console.log("Your transaction signature", tx);
  });

  it("initialized customer✅", async () => {
    // Add your test here.

    const name = "Arjun Rajput";
    const phone = "8745667377";

    const tx = await program.methods.initializeCustomer(name, phone)
      .accounts({
        customerAccount: customerPda,
        merchant: merchantPda,
        customer: customer.publicKey,
        authority: provider.wallet.publicKey,
        systemProgram: anchor.web3.SystemProgram.programId,
      })
      .rpc();



    const customerAccount = await program.account.customer.fetch(customerPda);
    assert.equal(customerAccount.name, name);
    assert.equal(customerAccount.phone, phone);
    assert.ok(customerAccount.customer.equals(customer.publicKey));
    assert.ok(customerAccount.authority.equals(provider.wallet.publicKey));

    console.log("Customer Account", customerAccount);
    console.log("Your transaction signature", tx);

  });



  it("Receipt Generated:✅", async () => {
    // Data for the receipt
    const name = "Gold chain";
    const description = "11.6638 grams gold";
    const amount = 115560.83;



    // If everything is good, call the program method to initialize the receipt
    const tx = await program.methods
      .initializeReceipt(name, description, amount)
      .accounts({
        receipt: receiptPda,          // PDA for receipt
        merchant: merchantPda,        // PDA for merchant
        customer: customer.publicKey, // Customer public key (should be initialized)
        authority: provider.wallet.publicKey, // Authority (usually the wallet's public key)
        systemProgram: anchor.web3.SystemProgram.programId, // System program ID
      })
      .rpc(); // Execute the transaction and send the request

    const receiptAccount = await program.account.receipt.fetch(receiptPda);
    console.log("Reciept Account", receiptAccount);
    console.log("Your transaction signature", tx);

  });

  it("Payment Done✅", async () => {
    const amount = 115560.83;


    const tx = await program.methods
      .payBill(amount) // assuming lamports
      .accounts({
        receipt: receiptPda, // ✅ this must be Account<Receipt> ka publicKey
        customer: provider.wallet.publicKey,
        merchant: merchantPda,
        authority: provider.wallet.publicKey,
        systemProgram: anchor.web3.SystemProgram.programId,
      })
      .rpc();
  console.log("✅ Transaction Signature:", tx);

  // 6️⃣ Fetch receipt and assert (optional)
  const receiptAccount = await program.account.receipt.fetch(receiptPda);
  console.log("Receipt payment verified ✅", receiptAccount);

  })

});
