"use client";

import Image from "next/image";

export default function MohRwandaLogo() {
    return (
        <span className="flex flex-col items-center gap-2">
            <Image
                src="/logos/Coat.png"
                alt="Ministry of Health Logo"
                width={50}
                height={50}
                className="object-contain"
            />
            <span className="text-lg font-semibold leading-none">MoH-Rwanda</span>
        </span>
    )
}