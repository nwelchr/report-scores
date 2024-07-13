"use client";

import { useEffect } from "react";
import { useRouter } from "next/router";

export default function ReportRedirectPage() {
  const router = useRouter();
  const { eventId } = router.query;

  useEffect(() => {
    if (eventId) {
      router.replace(`/events/${eventId}/report/select-entrant`);
    }
  }, [eventId, router]);

  return null;
}
