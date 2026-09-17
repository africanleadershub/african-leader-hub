"use client";

import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";

export function OtpField({
  value,
  onChange,
  disabled,
}: {
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
}) {
  return (
    <InputOTP
      maxLength={6}
      value={value}
      onChange={onChange}
      disabled={disabled}
      containerClassName="justify-center [&>input]:absolute [&>input]:inset-0 [&>input]:h-0 [&>input]:w-0 [&>input]:opacity-0"
    >
      <InputOTPGroup>
        {Array.from({ length: 6 }).map((_, index) => (
          <InputOTPSlot key={index} index={index} className="h-11 w-11 text-lg" />
        ))}
      </InputOTPGroup>
    </InputOTP>
  );
}
