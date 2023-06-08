import { keyframes } from '@emotion/react';

const HB_ANIMATION_KEYFRAMES = keyframes`
            0% {
              transform: scale(1);
            }
            5% {
              transform: scale(1.15);
            }
            10% {
              transform: scale(1);
            }
            15% {
              transform: scale(1.15);
            }
            20% {
              transform: scale(1);
            }
            100% {
              transform: scale(1);
            }
          `;

const PFP_BLUR_ANIMATION_KEYFRAMES = keyframes`
            0% {
              filter: blur(16px) brightness(100%);
              translate: 0px 0px;
              rotate: -3deg;
              scale: 1.025;
            }
            15% {
              filter: blur(16px) brightness(115%);
              translate: 5px 5px;
              rotate: -6deg;
              scale: 1.025;
            }
            25% {
              filter: blur(16px) brightness(155%);
              translate: 20px -5px;
              rotate: 12deg;
              scale: 1.15;
            }
            45% {
              filter: blur(16px) brightness(125%);
              translate: 5px -5px;
              rotate: -9deg;
              scale: 1.1;
            }
            65% {
              filter: blur(16px) brightness(145%);
              translate: -15px -5px; 
              rotate: 6deg;
              scale: 1.15;
            }
            75% {
              filter: blur(16px) brightness(115%);
              translate: -25px -5px; 
              rotate: -3deg;
              scale: 1.05;
            }
            90% {
              filter: blur(16px) brightness(145%);
              translate: -5px -5px; 
              rotate: 12deg;
              scale: 1.1;
            }
            100% {
              filter: blur(16px) brightness(100%);
              translate: 0px 0px;
              rotate: -3deg;
              scale: 1.025;
            }
        `;

const PFP_ANIMATION_KEYFRAMES = keyframes`
            0% {
              filter: brightness(100%);
              translate: 0px 0px;
              rotate: -3deg;
              scale: 1.02;            
            }
            15% {
              filter: brightness(100%);
              translate: 5px 5px;
              rotate: -6deg;
              scale: 1.02;
            }
            25% {
              filter: brightness(135%);
              translate: 20px -5px;
              rotate: 12deg;
              scale: 1.1;
            }
            45% {
              filter: brightness(105%);
              translate: 5px -5px;
              rotate: -9deg;
              scale: 1.1;            
            }
            65% {
              filter: brightness(125%);
              translate: -15px -5px;
              rotate: 6deg;
              scale: 1.15;
            }
            75% {
              filter: brightness(100%);
              translate: -25px -5px;
              rotate: -3deg;
              scale: 1;
            }
            90% {
              filter: brightness(125%);
              translate: -5px -5px;
              rotate: 12deg;
              scale: 1.05;
            }
            100% {
              filter: brightness(100%);
              translate: 0px 0px;
              rotate: -3deg;
              scale: 1.02;
            }
        `;

export { HB_ANIMATION_KEYFRAMES, PFP_ANIMATION_KEYFRAMES, PFP_BLUR_ANIMATION_KEYFRAMES };
