interface ISaveCommunity {
  data: ICommunity[];
}

interface ICommunity {
  communityDid: string;
  pfp: string;
  name: string;
  location: string;
  createdAt: number;
}
