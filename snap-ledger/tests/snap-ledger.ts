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



  it("initialized merchant", async () => {

    // Add your test here.
    const tx = await program.methods.initializeMerchant("Tanishq Jawelars", "Gold Shop")
      .accounts({
        merchant: merchantPda,
        authority: provider.wallet.publicKey,
        systemProgram: anchor.web3.SystemProgram.programId,
      })
      .rpc();


    console.log("Your transaction signature", tx);
  });

  it("initialized! customer", async () => {
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


    console.log("Your transaction signature", tx);
    const customerAccount = await program.account.customer.fetch(customerPda);

    console.log("Customer Name:", customerAccount.name);
    console.log("Customer Phone:", customerAccount.phone);
    assert.equal(customerAccount.name, name);
    assert.equal(customerAccount.phone, phone);
    assert.ok(customerAccount.customer.equals(customer.publicKey));
    assert.ok(customerAccount.authority.equals(provider.wallet.publicKey));
  });


});
