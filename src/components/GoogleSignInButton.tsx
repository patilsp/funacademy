import Script from "next/script";
import { useRouter } from "next/router";
import { useCallback, useEffect, useRef, useState } from "react";
import { useBoundStore } from "~/hooks/useBoundStore";
import { GoogleLogoSvg } from "./LoginScreen";

type GoogleCredentialResponse = {
  credential?: string;
};

type GoogleIdApi = {
  accounts: {
    id: {
      initialize: (config: {
        client_id: string;
        callback: (response: GoogleCredentialResponse) => void;
      }) => void;
      renderButton: (parent: HTMLElement, options: Record<string, unknown>) => void;
    };
  };
};

declare global {
  interface Window {
    google?: GoogleIdApi;
  }
}

export const GOOGLE_CLIENT_ID =
  process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID ?? "";

type GoogleProfile = {
  email?: string;
  name?: string;
  picture?: string;
};

/**
 * Decodes the JWT payload of a Google ID token.
 * Note: signature verification is a server-side concern; here the token is
 * only decoded to seed the local demo session (this app has no backend).
 */
const decodeJwtPayload = (token: string): GoogleProfile | null => {
  try {
    const base64 = token.split(".")[1]?.replace(/-/g, "+").replace(/_/g, "/");
    if (!base64) return null;
    const json = decodeURIComponent(
      atob(base64)
        .split("")
        .map((c) => `%${`00${c.charCodeAt(0).toString(16)}`.slice(-2)}`)
        .join(""),
    );
    return JSON.parse(json) as GoogleProfile;
  } catch {
    return null;
  }
};

export const GoogleSignInButton = ({
  mode = "signin",
  className = "",
}: {
  mode?: "signin" | "signup";
  className?: string;
}) => {
  const router = useRouter();
  const theme = useBoundStore((x) => x.theme);
  const setName = useBoundStore((x) => x.setName);
  const setUsername = useBoundStore((x) => x.setUsername);
  const setEmail = useBoundStore((x) => x.setEmail);
  const setPictureUrl = useBoundStore((x) => x.setPictureUrl);
  const logIn = useBoundStore((x) => x.logIn);

  const buttonRef = useRef<HTMLDivElement | null>(null);
  const [gisReady, setGisReady] = useState(false);

  const completeGoogleLogin = useCallback(
    (profile: GoogleProfile) => {
      const name = profile.name?.trim() || profile.email?.split("@")[0] || "Learner";
      setName(name);
      setUsername(name.replace(/\s+/g, "-").toLowerCase());
      if (profile.email) setEmail(profile.email);
      if (profile.picture) setPictureUrl(profile.picture);
      logIn();
      void router.push("/learn");
    },
    [setName, setUsername, setEmail, setPictureUrl, logIn, router],
  );

  const handleCredentialResponse = useCallback(
    (response: GoogleCredentialResponse) => {
      if (!response.credential) return;
      const profile = decodeJwtPayload(response.credential);
      if (profile) completeGoogleLogin(profile);
    },
    [completeGoogleLogin],
  );

  useEffect(() => {
    if (!gisReady || !GOOGLE_CLIENT_ID) return;
    const google = window.google;
    const container = buttonRef.current;
    if (!google || !container) return;

    google.accounts.id.initialize({
      client_id: GOOGLE_CLIENT_ID,
      callback: handleCredentialResponse,
    });
    container.innerHTML = "";
    google.accounts.id.renderButton(container, {
      theme: theme === "dark" ? "filled_black" : "outline",
      size: "large",
      text: mode === "signup" ? "signup_with" : "signin_with",
      shape: "rectangular",
      width: 320,
    });
  }, [gisReady, theme, mode, handleCredentialResponse]);

  if (!GOOGLE_CLIENT_ID) {
    // No OAuth client configured yet — provide a clearly-labeled demo flow so
    // the pages remain fully usable until the client ID is added.
    return (
      <button
        className={`fa-btn-secondary ${className}`}
        onClick={() =>
          completeGoogleLogin({
            name: "Demo Learner",
            email: "demo.learner@example.com",
          })
        }
        type="button"
      >
        <GoogleLogoSvg className="h-5 w-5" />
        Continue with Google
        <span className="fa-badge-neutral ml-1">demo</span>
      </button>
    );
  }

  return (
    <>
      <Script
        src="https://accounts.google.com/gsi/client"
        strategy="afterInteractive"
        onLoad={() => setGisReady(true)}
      />
      <div ref={buttonRef} className={`flex justify-center ${className}`} />
    </>
  );
};
