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
    title: string;
}

export default function ShareButtons({ shareUrl, title }: ShareButtonsProps) {
    return (
        <div className="flex gap-2 items-center">
            <h3 className="text-xl md:text-[16px] font-bold text-title">Share:</h3>
            <div className="flex gap-3 items-center">
                <FacebookShareButton url={shareUrl}>
                    <FacebookIcon size={32} round />
                </FacebookShareButton>

                <TwitterShareButton url={shareUrl} title={title}>
                    <TwitterIcon size={32} round />
                </TwitterShareButton>

                <WhatsappShareButton url={shareUrl} title={title}>
                    <WhatsappIcon size={32} round />
                </WhatsappShareButton>

                <TelegramShareButton url={shareUrl} title={title}>
                    <TelegramIcon size={32} round />
                </TelegramShareButton>
            </div>
        </div>
    )
}