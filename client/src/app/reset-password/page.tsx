"use client";

import { ResetPwContainer } from "@/components/ResetPassword/ResetPwContainer";
import "../reset-password-request/styles.scss";
import RootLayout from "../layout";
import { DefaultContainer } from "@/components/DefaultContainer/DefaultContainer";
import { ResetForm } from "@/components/ResetPassword/ResetForm";
import Image from "next/image";
import { useSearchParams } from "next/navigation";

export default function ResetPasswordRequest() {
  const searchParams = useSearchParams();
  const id = searchParams?.get("userId");
  const token = searchParams?.get("token");
  return (
    <RootLayout>
      <DefaultContainer>
        <main className="reset__wrapper">
          <ResetPwContainer>
            <Image
              src="/logo.svg"
              width={160}
              height={32}
              alt="Gnaw Guru Logo"
              className="reset__logo"
            />
            <h1 className="main-heading reset__heading">Reset your password</h1>
            <p className="basic-text reset__text">
              Set your new password, min 6 and max 20 characters.
            </p>
            <ResetForm id={id} token={token} />
          </ResetPwContainer>
        </main>
      </DefaultContainer>
    </RootLayout>
  );
}

export const metadata = {
  title: "Password Reset",
  generator: "Next.js",
  applicationName: "Gnaw-Guru",
  referrer: "origin-when-cross-origin",
  keywords: ["Gnaw-Guru", "Dentist", "CRM"],
  authors: [{ name: "Daniel", url: "https://github.com/szildaniel" }],
  colorScheme: "dark",
  creator: "Daniel Mydlarz",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
};
