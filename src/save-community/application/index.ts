import { CeramicClient } from "@ceramicnetwork/http-client";
import { DataModel } from "@glazed/datamodel";
import { DIDDataStore } from "@glazed/did-datastore";
import crypto from "crypto";
import { DID } from "dids";
import { Ed25519Provider } from "key-did-provider-ed25519";
import { getResolver } from "key-did-resolver";
import { fromString } from "uint8arrays";
import { aliases } from "../../utils/ceramic.js";

const saveCommunity = async ({
  communityDid,
  pfp,
  name,
  location,
}: ICommunity) => {
  let result: any;

  const tagHashSeed = crypto.createHash("sha256").update("serve").digest("hex");
  const subHash = tagHashSeed.substring(0, 32);

  try {
    const seed = fromString(Buffer.from(subHash).toString("hex"), "base16");

    // Create and authenticate the DID
    const did = new DID({
      provider: new Ed25519Provider(seed),
      resolver: getResolver(),
    });
    await did.authenticate();

    // Connect to the local Ceramic node
    const ceramic = new CeramicClient(process.env.CERAMIC_NODE_URL);
    ceramic.did = did;

    const model = new DataModel({ ceramic, aliases });
    const store = new DIDDataStore({ ceramic, model });

    const doc = (await store.get("quiverblissServer")) as ISaveCommunity;

    console.log("this is doc")
    console.log(doc)
    

    let bookmarks: {
      communityDid: string;
      pfp: string;
      name: string;
      location: string;
      createdAt: number;
    }[];

    if (doc && doc.data) {
      bookmarks = [...doc.data];
    } else {
      bookmarks = [];
    }

    bookmarks.push({
      communityDid,
      pfp,
      name,
      location,
      createdAt: Date.now(),
    });

    const data = { data: [...bookmarks] };

    await store.set("quiverblissServer", { ...data });

    result = {
      state: "successful",
      data: {
        status: true,
        msg: "Tag added to image",
      },
    };
    return result;
  } catch (error) {
    console.error(error);
    result = {
      state: "failed",
      data: {
        status: false,
        msg: "An error occurred.",
      },
    };
    return result;
  }
};

export default saveCommunity;
