import React from 'react'

import {
    FacebookShareButton,
    TwitterShareButton,
    WhatsappShareButton,
    TelegramShareButton,
    FacebookIcon,
    TwitterIcon,
    WhatsappIcon,
    TelegramIcon
} from 'react-share'

interface ShareButtonsProps {
    shareUrl: string;
    shareTitle: string;
}

export default function ShareButtons({ shareUrl, shareTitle }: ShareButtonsProps) {
    return (
        <div className="flex gap-2 items-center">
            <h3 className="text-xl md:text-[16px] font-bold text-title">Share:</h3>
            <div className="flex gap-3 items-center">
                <FacebookShareButton url={shareUrl}>
                    <FacebookIcon size={32} round />
                </FacebookShareButton>

                <TwitterShareButton url={shareUrl} title={shareTitle}>
                    <TwitterIcon size={32} round />
                </TwitterShareButton>

                <WhatsappShareButton url={shareUrl} title={shareTitle}>
                    <WhatsappIcon size={32} round />
                </WhatsappShareButton>

                <TelegramShareButton url={shareUrl} title={shareTitle}>
                    <TelegramIcon size={32} round />
                </TelegramShareButton>
            </div>
        </div>
    )
}