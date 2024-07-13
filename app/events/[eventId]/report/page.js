"use client";

import { useEffect } from "react";
import { useParams, useRouter } from "next/navigation";

export default function ReportRedirectPage() {
  const router = useRouter();
  const { eventId } = useParams();

  useEffect(() => {
    if (eventId) {
      router.replace(`/events/${eventId}/report/select-entrant`);
    }
  }, [eventId, router]);

  return null;
}
