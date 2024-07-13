import { ArrowUturnLeftIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";

const Header = () => {
  const router = useRouter();
  const { pathname } = router;
  const canGoBack = pathname !== "/events/[eventId]/report/select-entrant";

  return (
    <header className="absolute left-2 top-2 z-50 w-full p-4 flex items-center">
      {canGoBack && (
        <button
          onClick={() => router.back()}
          className="text-white hover:text-slate-400"
        >
          <ArrowUturnLeftIcon className="w-8 h-8" />
        </button>
      )}
    </header>
  );
};

export default Header;
