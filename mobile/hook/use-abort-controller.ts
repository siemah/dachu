import { useEffect, useRef } from "react";

/**
 * Http request abortion
 * @returns Abort controller helpers
 */
export default function useAbortController() {
  const controller = useRef<AbortController>(null!);

  const newAbortSignal = () => {
    controller.current = new AbortController();
    return controller.current.signal;
  };

  const cancelPreviousRequest = () => {
    if (controller.current) controller.current.abort();
  };

  // Cancel pending request on unmout
  useEffect(() => cancelPreviousRequest, []);

  return { controller, newAbortSignal, cancelPreviousRequest };
};