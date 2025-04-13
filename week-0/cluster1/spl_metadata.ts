import {
	createV1,
	findMetadataPda,
	mplTokenMetadata,
	TokenStandard
} from "@metaplex-foundation/mpl-token-metadata";
import { mplToolbox } from "@metaplex-foundation/mpl-toolbox";
import {
  generateSigner,
  percentAmount,
  sol,
} from "@metaplex-foundation/umi";
import { 
    createMetadataAccountV3, 
    CreateMetadataAccountV3InstructionAccounts, 
    CreateMetadataAccountV3InstructionArgs,
    DataV2Args
} from "@metaplex-foundation/mpl-token-metadata";
import { createUmi } from "@metaplex-foundation/umi-bundle-defaults";
import { base58 } from "@metaplex-foundation/umi/serializers";
import { createSignerFromKeypair, signerIdentity, publicKey } from "@metaplex-foundation/umi";

// const umi = createUmi("https://api.devnet.solana.com")
// 	.use(mplTokenMetadata())
// 	.use(mplToolbox());

// // Generate a new keypair signer.
// const signer = generateSigner(umi);

// // Tell umi to use the new signer.
// umi.use(signerIdentity(signer));

// Create a UMI connection

import wallet from "./dev-wallet.json";
const umi = createUmi('https://api.devnet.solana.com');
const keypair = umi.eddsa.createKeypairFromSecretKey(new Uint8Array(wallet));
const signer = createSignerFromKeypair(umi, keypair);
umi.use(signerIdentity(createSignerFromKeypair(umi, keypair)));


// your SPL Token mint address
const mint = publicKey("ExnoxbWjHrrgtscAY4jJeGtHn6hjYQ2sgjtMGyjRvJce");
 

// Sample Metadata for our Token
const tokenMetadata = {
	name: 'Solana Turbine3',
	symbol: 'Class 3 token',
	uri: 'https://avatars.githubusercontent.com/u/95625543?v=4',

};

// Add metadata to an existing SPL token wrapper function
async function addMetadata() {

    // derive the metadata account that will store our metadata data onchain
	const metadataAccountAddress = await findMetadataPda(umi, {
		mint: mint,
	});

	const tx = await createV1(umi, {
		mint,
		authority: umi.identity,
		payer: umi.identity,
		updateAuthority: umi.identity,
		name: tokenMetadata.name,
		symbol: tokenMetadata.symbol,
		uri: tokenMetadata.uri,
		sellerFeeBasisPoints: percentAmount(5.5), // 5.5%
		tokenStandard: TokenStandard.Fungible,
	}).sendAndConfirm(umi);

	let txSig = base58.deserialize(tx.signature);
	console.log(`https://explorer.solana.com/tx/${txSig}?cluster=devnet`);
}

// run the function
addMetadata();