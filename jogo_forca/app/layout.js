export const metadata = {
  title: "Jogo da Forca",
  description: "Um jogo da forca feito com Next.js",
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
