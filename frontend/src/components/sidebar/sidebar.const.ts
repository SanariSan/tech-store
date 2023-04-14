const homeIconS = {
  viewBox: '0 0 20 20',
  d: 'M0 8.69409C0 8.13066 0.233717 7.59645 0.651069 7.21666L8.64388 1.13585C9.41181 0.434698 10.5846 0.434698 11.3525 1.13585L19.3489 7.21665C19.7621 7.59644 20 8.13065 20 8.69407L18.0134 18.0525C17.6012 18.9429 17.1161 19.388 16.0102 19.388H3.98624C2.88025 19.388 2.4652 19.388 1.98294 18.0525L0 8.69409ZM7.99281 13.1556V15.8266C7.99281 16.3817 8.43938 16.717 8.99446 16.717H10.9977C11.5528 16.717 11.9994 16.3817 11.9994 15.8266V13.1556C11.9994 12.6005 11.5528 12.2652 10.9977 12.2652H8.99446C8.43938 12.2652 7.99281 12.6005 7.99281 13.1556Z',
};
const boxIconS = {
  viewBox: '0 0 20 20',
  d: 'M2.26339 1.18304L0 5.71429H9.28571V0H4.18304C3.37054 0 2.62946 0.459821 2.26339 1.18304ZM10.7143 5.71429H20L17.7366 1.18304C17.3705 0.459821 16.6295 0 15.817 0H10.7143V5.71429ZM20 7.14286H0V17.1429C0 18.7188 1.28125 20 2.85714 20H17.1429C18.7188 20 20 18.7188 20 17.1429V7.14286Z',
};
const heartIconS = {
  viewBox: '0 0 20 16',
  d: 'M1.85937 9.43701L8.91797 15.6017C9.21094 15.8575 9.59766 16 10 16C10.4023 16 10.7891 15.8575 11.082 15.6017L18.1406 9.43701C19.3281 8.40286 20 6.95213 20 5.43563V5.22368C20 2.66938 18.0273 0.491461 15.3359 0.0712247C13.5547 -0.206497 11.7422 0.337983 10.4688 1.52926L10 1.96777L9.53125 1.52926C8.25781 0.337983 6.44531 -0.206497 4.66406 0.0712247C1.97266 0.491461 0 2.66938 0 5.22368V5.43563C0 6.95213 0.671875 8.40286 1.85937 9.43701Z',
};

export const SIDEBAR_TEMPLATE = [
  {
    title: 'Home',
    icon: homeIconS,
    sub: null,
  },
  {
    title: 'Discover',
    icon: boxIconS,
    sub: [
      {
        title: 'DDDD',
        icon: null,
        sub: null,
      },
      {
        title: 'BBBB',
        icon: null,
        sub: null,
      },
      {
        title: 'CCCC',
        icon: null,
        sub: null,
      },
    ],
  },
  {
    title: 'Liked',
    icon: heartIconS,
    sub: null,
  },
];
