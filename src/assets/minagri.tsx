"use client";

import Image from "next/image";

export default function MinagriLogo() {
    return (
        <span className="flex flex-col items-center gap-2">
            <Image
                src="/logos/Coat.png"
                alt="Ministry of Agriculture and Animal Resources Logo"
                width={50}
                height={50}
                className="object-contain"
            />
            <span className="text-lg font-semibold leading-none">MINAGRI</span>
        </span>
    )
}