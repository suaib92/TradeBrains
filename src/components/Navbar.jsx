import Link from 'next/link';

const Navbar = () => {
  return (
    <nav className="bg-blue-800 p-4 text-white flex justify-between">
      <div className="text-lg font-bold">
        <Link href="/" legacyBehavior>
          <a>TradeBrains</a>
        </Link>
      </div>
      <div>
        <Link href="/movers" legacyBehavior>
          <a className="px-4">NIFTY Movers</a>
        </Link>
        <Link href="/stocks" legacyBehavior>
          <a className="px-4">Stocks</a>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
