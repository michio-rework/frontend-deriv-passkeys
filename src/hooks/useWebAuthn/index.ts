import {
  browserSupportsWebAuthn,
  browserSupportsWebAuthnAutofill,
} from "@simplewebauthn/browser";
import { useCallback, useEffect, useState } from "react";

const useWebAuthn = () => {
  const [hasWebAuthnSupport, setHasWebAuthnSupport] = useState<boolean>(false);
  const [hasWebAuthnAutofill, setHasWebAuthnAutofill] =
    useState<boolean>(false);

  const checkAutofillSupport = useCallback(async () => {
    const supportsAutofill = await browserSupportsWebAuthnAutofill();
    setHasWebAuthnAutofill(supportsAutofill);
  }, []);

  useEffect(() => {
    const supportsWebAuthn = browserSupportsWebAuthn();
    setHasWebAuthnSupport(supportsWebAuthn);
    checkAutofillSupport();
  }, [checkAutofillSupport]);

  return { hasWebAuthnSupport, hasWebAuthnAutofill };
};

export default useWebAuthn;
