import { ArrowUturnLeftIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/router";

const Header = () => {
  const router = useRouter();
  const { pathname } = router;
  const canGoBack = pathname !== "/events/[eventId]/report/select-entrant";

  return (
    <header className="w-full p-4 bg-gray-900 flex items-center">
      {canGoBack && (
        <button
          onClick={() => router.back()}
          className="text-white hover:text-gray-400"
        >
          <ArrowUturnLeftIcon className="w-8 h-8" />
        </button>
      )}
    </header>
  );
};

export default Header;
