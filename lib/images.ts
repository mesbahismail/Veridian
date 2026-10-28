/**
 * All photography lives here so you can swap in your own assets in one place.
 * Remote Unsplash photos (free to use under the Unsplash License).
 * To bundle locally: drop files in /assets and replace a URL with require('@/assets/xxx.jpg').
 */
const u = (id: string, w = 900) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;

export const images = {
  welcome: u('photo-1551918120-9739cb430c6d', 1200),
  loginBg: u('photo-1551918120-9739cb430c6d', 1200),
  searchBg: u('photo-1569733322744-3bb59191c4e3', 1200),

  celadon: u('photo-1584132967334-10e028bd69f7'),
  oceanBreeze: u('photo-1566073771259-6a8506099945'),
  seaside: u('photo-1584132967334-10e028bd69f7'),
  coralReef: u('photo-1551882547-ff40c63fe5fa'),
  sandyShores: u('photo-1748630725293-83a673a00295'),
  palmParadise: u('photo-1604145195376-e2c8195adf29'),
  tropicalWave: u('photo-1529290130-4ca3753253ae'),
  greensPool: u('photo-1520250497591-112f2f40a3f4'),
  greensLobby: u('photo-1782834294703-5b73c59466e3'),
  boutique: u('photo-1570213489059-0aac6626cade'),

  iceland: u('photo-1548540841-acd06bd9702e'),
  spain: u('photo-1672980411106-176b4151a8cd'),
  greece: u('photo-1533105079780-92b9be482077'),

  roomPool: u('photo-1529290130-4ca3753253ae', 400),
  roomBed: u('photo-1590490360182-c33d57733427', 400),
  roomView: u('photo-1445019980597-93fa8acb246c', 400),

  avatars: {
    maya: u('photo-1438761681033-6461ffad8d80', 200),
    giorgio: u('photo-1507003211169-0a1dd7228f2d', 200),
    zoe: u('photo-1534528741775-53994a69daeb', 200),
    // the design reuses the profile portrait for this reviewer
    lila: `${u('photo-1581403341630-a6e0b9d2d257', 200)}&h=200&crop=focalpoint&fp-x=0.43&fp-y=0.35&fp-z=1.25`,
    // head-and-shoulders framing, as in the design
    profile: `${u('photo-1581403341630-a6e0b9d2d257', 400)}&h=400&crop=focalpoint&fp-x=0.43&fp-y=0.35&fp-z=1.25`,
  },
};
