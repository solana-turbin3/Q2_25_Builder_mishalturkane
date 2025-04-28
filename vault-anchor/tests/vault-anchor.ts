import * as anchor from "@coral-xyz/anchor";
import { Program } from "@coral-xyz/anchor";
import { VaultAnchor } from "../target/types/vault_anchor";

describe("vault-anchor", () => {
  // Configure the client to use the local cluster
  const provider = anchor.AnchorProvider.env();
  anchor.setProvider(provider);

  const program = anchor.workspace.VaultAnchor as Program<VaultAnchor>;

  // Derive PDAs
  const vaultState = anchor.web3.PublicKey.findProgramAddressSync(
    [Buffer.from("state"), provider.publicKey.toBytes()],
    program.programId
  )[0];

  const vault = anchor.web3.PublicKey.findProgramAddressSync(
    [Buffer.from("vault"), provider.publicKey.toBytes()],
    program.programId
  )[0];

  it("Is initialized!", async () => {
    const balance = await provider.connection.getBalance(provider.publicKey);
    console.log("Balance is:", balance / anchor.web3.LAMPORTS_PER_SOL);

    const tx = await program.methods
      .initialize()
      .accountsPartial({
        user: provider.wallet.publicKey,
        vaultState,
        vault,
        systemProgram: anchor.web3.SystemProgram.programId,
      })
      .rpc();
    console.log("\nYour transaction signature", tx);
    console.log("Vault info:", await provider.connection.getAccountInfo(vault));
  });

  it("Deposit 2 SOL", async () => {
    const tx = await program.methods
      .deposit(new anchor.BN(2 * anchor.web3.LAMPORTS_PER_SOL))
      .accountsPartial({
        user: provider.wallet.publicKey,
        vaultState,
        vault,
        systemProgram: anchor.web3.SystemProgram.programId
      })
      .rpc();

      console.log("\nYour transaction signature", tx);
      console.log(
        "Your vault info",
        await provider.connection.getAccountInfo(vault)
      );
      const balance = await provider.connection.getBalance(provider.publicKey);
    console.log("Balance is:", balance / anchor.web3.LAMPORTS_PER_SOL);

  });

  it("Withdraw 1 SOL", async () => {
    const tx = await program.methods
      .withdraw(new anchor.BN(1 * anchor.web3.LAMPORTS_PER_SOL))
      .accountsPartial({
        user: provider.wallet.publicKey,
        vaultState,
        vault,
        systemProgram: anchor.web3.SystemProgram.programId
      })
      .rpc();

    console.log("\nYour transaction signature", tx);
    const balance = await provider.connection.getBalance(provider.publicKey);
    console.log("Balance is:", balance / anchor.web3.LAMPORTS_PER_SOL);

  });

  it("Close vault", async () => {
    const tx = await program.methods
      .close()
      .accountsPartial({
        user: provider.wallet.publicKey,
        vaultState,
        vault,
        systemProgram: anchor.web3.SystemProgram.programId
      })
      .rpc();

      console.log("\nYour transaction signature", tx);
      const balance = await provider.connection.getBalance(provider.publicKey);
    console.log("Balance is:", balance / anchor.web3.LAMPORTS_PER_SOL);

  });
});
