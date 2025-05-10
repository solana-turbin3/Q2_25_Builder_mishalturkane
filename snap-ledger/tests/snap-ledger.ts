import * as anchor from "@coral-xyz/anchor";
import { Program } from "@coral-xyz/anchor";
import { SnapLedger } from "../target/types/snap_ledger";
import { expect } from "chai";

describe("snap-ledger", () => {
  // Configure the client to use the local cluster.
  const provider = anchor.AnchorProvider.env();
  anchor.setProvider(provider);

  const program = anchor.workspace.snapLedger as Program<SnapLedger>;


  const [merchantPda, _bump] = anchor.web3.PublicKey.findProgramAddressSync(
    [Buffer.from("merchant"), provider.wallet.publicKey.toBuffer()],
    program.programId
  );

  it("Is initialized!", async () => {
    // Add your test here.
    const tx = await program.methods.initializeMerchant("Test Merchant", "")
    .accounts({
      merchant: merchantPda,
      authority: provider.wallet.publicKey,
      systemProgram: anchor.web3.SystemProgram.programId,
    })
    .rpc();


    console.log("Your transaction signature", tx);
  });
});
