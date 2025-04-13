import { publicKey } from '@metaplex-foundation/umi';
import { Keypair, Connection, Commitment } from "@solana/web3.js";
import { createMint } from '@solana/spl-token';
import wallet from "./dev-wallet.json"


// Import our keypair from the wallet file
const keypair = Keypair.fromSecretKey(new Uint8Array(wallet));

// Create a Solana devnet connection
const commitment: Commitment = "confirmed";
const connection = new Connection("https://api.devnet.solana.com", commitment);

(async () => {
    try {
        // Create the mint
        const mint = await createMint(
            connection,  // Connection object
            keypair,     // Payer (fee-payer)
            keypair.publicKey,  // Mint authority
            keypair.publicKey,       // Freeze authority (null means no freeze authority)
            9            // Decimals
        );

        console.log(`Mint created: ${mint.toBase58()}`);
    } catch(error) {
        console.log(`Oops, something went wrong: ${error}`)
    }
})();
// token created 7rUUHUEEujXpKcAanTD7BqT3mpLBvjBdetfWvmkk3wzX