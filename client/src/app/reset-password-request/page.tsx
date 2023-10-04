import { ResetPwContainer } from "@/components/ResetPassword/ResetPwContainer";
import "./styles.scss";
import RootLayout from "../layout";
import { DefaultContainer } from "@/components/DefaultContainer/DefaultContainer";
import { ResetRequestForm } from "@/components/ResetPassword/ResetRequestForm";
import Image from "next/image";

export default function ResetPassword() {
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
            <h1 className="main-heading reset__heading">Forgot your password?</h1>
            <p className="basic-text reset__text">
              Just provide your email, and we&apos;ll help you set a new password.
            </p>
            <ResetRequestForm />
          </ResetPwContainer>
        </main>
      </DefaultContainer>
    </RootLayout>
  );
}

export const metadata = {
  title: "Password reset request",
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