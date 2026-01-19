import type { Metadata } from "next";
import "./globals.css";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import RecoilProvider from "./ClientProviders";

export const metadata: Metadata = {
  title: "Phim PPF và Cách nhiệt Rimo cao cấp dành ô tô",
  description: "Rimo là thương hiệu Phim cách nhiệt và PPF cao cấp dành cho ô tô. Công nghệ Nano Cenamic Gốm & Phún xạ kim loại. Chứng nhận COCQ đầy đủ, Công ty Quang Minh nhập khẩu và phân phối chính hãng",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
        />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
        />

        <link href="https://fonts.googleapis.com/css2?family=Work+Sans:ital,wght@0,100..900;1,100..900&display=swap" rel="stylesheet" />
      </head>

      <body>
        <RecoilProvider>
          <AntdRegistry>
            {children}
          </AntdRegistry>
        </RecoilProvider>
      </body>
    </html>
  );
}
