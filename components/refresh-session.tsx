"use client";

import { useSession } from "next-auth/react";
import { useEffect, useRef } from "react";

/** Pull membershipLevel from the database into the JWT after a payment or redeem. */
export function RefreshSession() {
  const { update } = useSession();
  const once = useRef(false);

  useEffect(() => {
    if (once.current) return;
    once.current = true;
    void update();
  }, [update]);

  return null;
}
