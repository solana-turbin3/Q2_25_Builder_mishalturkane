import {
    findAssociatedTokenPda,
    mplToolbox,
    transferTokens,
} from '@metaplex-foundation/mpl-toolbox'
import { keypairIdentity, publicKey } from '@metaplex-foundation/umi'
import { createUmi } from '@metaplex-foundation/umi-bundle-defaults'
import { base58 } from '@metaplex-foundation/umi/serializers'
import wallet from "./dev-wallet.json";

const transferSplTokens = async () => {
    const umi = createUmi("https://devnet-aura.metaplex.com/3c1b83dd-9d56-46e1-a624-c9969f7cd479").use(mplToolbox())

    // import a wallet that has the SPL Token you want to transfer

    // Convert your walletFile onto a keypair.
    let keypair = umi.eddsa.createKeypairFromSecretKey(new Uint8Array(wallet));

    // Load the keypair into umi.
    umi.use(keypairIdentity(keypair))

    //
    // Key Accounts
    //

    // The address of the Token you want to transfer.
    const splToken = publicKey("4JqhAbhXEYNYweRZvjFqFonm5UZXZBnBNgohUbSjrwcx");

    // The address of the wallet you want to transfer the Token to.
    const destinationWallet = publicKey("4sSBhVE5pusC8eo8AFXMgCbp3fU3DsBnJbRHhG599yAh");

    // Find the associated token account for the SPL Token on the senders wallet.
    const sourceTokenAccount = findAssociatedTokenPda(umi, {
        mint: splToken,
        owner: umi.identity.publicKey,
    });

    // Find the associated token account for the SPL Token on the receivers wallet.
    const destinationTokenAccount = findAssociatedTokenPda(umi, {
        mint: splToken,
        owner: destinationWallet,
    });

    //
    // Transfer SPL Token
    //

    const res = await transferTokens(umi, {
        source: sourceTokenAccount,
        destination: destinationTokenAccount,
        amount: 1000000000, // amount of tokens to transfer*
    }).sendAndConfirm(umi);

    // Finally we can deserialize the signature that we can check on chain.
    const signature = base58.deserialize(res.signature)[0];

    // Log out the signature and the links to the transaction and the NFT.
    console.log("\nTransfer Complete")
    console.log(`🔗 View Transaction: https://explorer.solana.com/tx/${signature}?cluster=devnet`);

}

transferSplTokens();