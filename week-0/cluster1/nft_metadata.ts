import wallet from "./dev-wallet.json"
import { createUmi } from "@metaplex-foundation/umi-bundle-defaults"
import { createGenericFile, createSignerFromKeypair, signerIdentity } from "@metaplex-foundation/umi"
import { irysUploader } from "@metaplex-foundation/umi-uploader-irys"

// Create a devnet connection
const umi = createUmi('https://api.devnet.solana.com');

let keypair = umi.eddsa.createKeypairFromSecretKey(new Uint8Array(wallet));
const signer = createSignerFromKeypair(umi, keypair);

umi.use(irysUploader());
umi.use(signerIdentity(signer));

(async () => {
    try {
        // Follow this JSON structure
        // https://docs.metaplex.com/programs/token-metadata/changelog/v1.0#json-structure

        const irysURI = "https://devnet.irys.xyz/CS8isC3EGQhnzELVyZNC88rUd8XVtWNSSPoB2Gp6gQkd";
         console.log("your image is:",irysURI);


         const image = irysURI;
        const metadata = {
            name: "Boo and Bade",
            symbol: "BNB",
            description: "Boo showing love to bade",
            image: image,
            attributes: [
                {trait_type: 'colors', value: '10'}
            ],
            properties: {
                files: [
                    {
                        type: "image/png",
                        uri: "image"
                    },
                ]
            },
            creators: []
        };
        
        const myUri= await umi.uploader.uploadJson(metadata);

        console.log("Your metadata URI: ", myUri);
    }
    catch (error) {
        console.log("Oops.. Something went wrong", error);
    }
})();
//https://devnet.irys.xyz/6eTLxcwsS3xCk1XWwq14Kmi9kAqcc6tXmQyuR7zLxFKG   normal angy jeff
//https://devnet.irys.xyz/Er7mYS13F1tc6upQPHvFGTP9oSqegE3KUfYRLbzEzC5F   angy jeff with metadata