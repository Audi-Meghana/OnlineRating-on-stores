import { Link } from "react-router-dom";

export default function Sidebar({ links }) {
  return (
    <aside className="w-64 bg-white border-r hidden md:block h-screen p-6 fixed">
      <nav className="space-y-3">
        {links.map((item) => (
          <Link
            key={item.to}
            to={item.to}
            className="block px-4 py-2 rounded-md text-slate-700 hover:bg-slate-100"
          >
            {item.label}
          </Link>
        ))}
      </nav>
    </aside>
  );
}
