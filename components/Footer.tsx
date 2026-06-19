export default function Footer() {
  return (
    <footer className="border-t border-gray-100 py-8 px-4 text-center">
      <p className="text-sm text-gray-400">
        © {new Date().getFullYear()} Paul Arthur Meteng · Built with Next.js & Tailwind CSS
      </p>
    </footer>
  );
}
