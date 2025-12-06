"use client";

import Image from "next/image";

export default function MigeprofLogo() {
    return (
        <span className="flex flex-col items-center gap-2">
            <Image
                src="/logos/Coat.png"
                alt="Migeprof Logo"
                width={50}
                height={50}
                className="object-contain"
            />
            <span className="text-lg font-semibold leading-none">MIGEPROF</span>
        </span>
    )
}