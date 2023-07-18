import LayoutProvider from "@/components/layout/LayoutProvider";
import "./globals.css";
import "typeface-parisienne";
import "typeface-poppins";
import "typeface-pacifico";
import "typeface-lobster";
import "@/components/styles/dashboard/dashboard.css";
import { ReduxProviders } from "@/redux/Provider";

export const metadata = {
  title: "Munch Express",
  description:
    "An Food ordering website powered by NextJs. Made with 💖 By Harshit Sharma!",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <ReduxProviders>
          <LayoutProvider>{children}</LayoutProvider>
        </ReduxProviders>
      </body>
    </html>
  );
}
