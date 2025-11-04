import Link from "next/link";

const Navbar = () => {
    return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <a className="text-2xl font-bold text-gray-800" href="/"><span className="text-indigo-600">AutoDriveS.A.</span> Dealership</a>
        <div>
          <Link href="/components/inventory" className="text-gray-600 hover:text-gray-800 mx-4">Inventory</Link>
          <Link href="/about" className="text-gray-600 hover:text-gray-800 mx-4">About Us</Link>
          <Link href="/contact" className="text-gray-600 hover:text-gray-800 mx-4">Contact</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
