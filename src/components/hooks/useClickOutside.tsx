import { useEffect, RefObject } from "react";

const useClickOutside = <T extends HTMLElement>(
  ref: RefObject<T | undefined>,
  handler: (event: MouseEvent) => void
) => {
  useEffect(() => {
    const listener = (e: MouseEvent) => {
      const element = ref?.current;

      if (!element || element.contains(e.target as Node)) {
        return;
      }

      handler(e);
    };

    document.addEventListener("mousedown", listener);

    return () => {
      document.removeEventListener("mousedown", listener);
    };
  }, [ref, handler]);
};

export default useClickOutside;
