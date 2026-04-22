import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <section className="rounded-lg bg-white p-8 text-center shadow">
      <h1 className="text-3xl font-bold text-slate-800">404</h1>
      <p className="mt-2 text-slate-600">Page not found.</p>
      <Link to="/" className="mt-4 inline-block rounded-md bg-blue-600 px-4 py-2 text-white">
        Back Home
      </Link>
    </section>
  );
};

export default NotFound;
