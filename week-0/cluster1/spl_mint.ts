import { Keypair, PublicKey, Connection, Commitment } from "@solana/web3.js";
import { getOrCreateAssociatedTokenAccount, mintTo } from '@solana/spl-token';
import wallet from "./dev-wallet.json";

// Import our keypair from the wallet file
const keypair = Keypair.fromSecretKey(new Uint8Array(wallet));

// Create a Solana devnet connection
const commitment: Commitment = "confirmed";
const connection = new Connection("https://api.devnet.solana.com", commitment);

// new token  address
const mint = new PublicKey("ExnoxbWjHrrgtscAY4jJeGtHn6hjYQ2sgjtMGyjRvJce");

// const ata = 7fJH5vh12vYLUL4y3ig1Qru1ZToDRjG7BDHc9Z9HGdWP

(async () => {
    try {
        // Create an Associated Token Account (ATA)
        const tokenAccount = await getOrCreateAssociatedTokenAccount(
            connection,
            keypair,
            mint,
            keypair.publicKey
        );
      
        console.log(`✅ ATA Created: ${tokenAccount.address.toBase58()}`);
        console.log(`🔗 View on Explorer: https://explorer.solana.com/address/${tokenAccount.address.toBase58()}?cluster=devnet`);

        // Mint Tokens to the ATA
        const mintTxSignature = await mintTo(
            connection,
            keypair,
            mint,
            tokenAccount.address,
            keypair.publicKey,
            1000000000000000000000 // Because decimals for the mint are set to 9
        );
        
        console.log(`✅ Tokens Minted!`);
        console.log(`🔗 View Mint Transaction: https://explorer.solana.com/tx/${mintTxSignature}?cluster=devnet`);
        console.log(`✅ Token: ${mint}`);
        console.log(`🔗 View on Explorer: https://explorer.solana.com/address/${mint}?cluster=devnet`);


    } catch (error) {
        console.error(`❌ Oops, something went wrong: ${error}`);
    }
})();
