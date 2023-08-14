import LayoutProvider from "@/components/layout/LayoutProvider";
import "./globals.css";
import "typeface-parisienne";
import "typeface-poppins";
import "typeface-pacifico";
import "typeface-lobster";
import "@/components/styles/dashboard/dashboard.css";
import { ReduxProviders } from "@/redux/Provider";
import "@radix-ui/themes/styles.css";
import { Theme } from "@radix-ui/themes";

export const metadata = {
  title: "Munch Express",
  description:
    "An Food ordering website powered by NextJs. Made with 💖 By Harshit Sharma!",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Theme>
          <ReduxProviders>
            <LayoutProvider>{children}</LayoutProvider>
          </ReduxProviders>
        </Theme>
      </body>
    </html>
  );
}
