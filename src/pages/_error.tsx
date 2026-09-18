import type { NextPageContext } from "next";
import Link from "next/link";
import type { ReactElement } from "react";

type ErrorPageProps = {
  statusCode: number;
  title?: string;
};

const getInitialProps = async ({ res, err }: NextPageContext): Promise<ErrorPageProps> => {
  const statusCode = res?.statusCode ?? err?.statusCode ?? 500;
  return { statusCode };
};

const messages: Record<number, { title: string; body: string }> = {
  401: { title: "You need to sign in", body: "Please sign in to view this page." },
  403: { title: "No access", body: "You don't have permission to view this page." },
  404: { title: "Page not found", body: "The page you're looking for doesn't exist or has moved." },
  500: { title: "Something went wrong", body: "An unexpected error occurred on our side. Please try again in a moment." },
};

const ErrorPage = ({ statusCode }: ErrorPageProps): ReactElement => {
  const copy = messages[statusCode] ?? {
    title: `Error ${statusCode}`,
    body: "An unexpected error occurred. Please try again.",
  };
  return (
    <main className="fa-bg-aurora fa-bg-dots flex min-h-screen flex-col items-center justify-center bg-canvas px-4 text-ink">
      <div className="fa-card w-full max-w-md p-8 text-center sm:p-10">
        <div className="fa-badge-neutral mx-auto mb-5 w-fit">{statusCode}</div>
        <h1 className="fa-h1 mb-3">{copy.title}</h1>
        <p className="fa-sub mb-8">{copy.body}</p>
        <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
          <Link href="/learn" className="fa-btn-primary w-full sm:w-auto sm:min-w-[160px]">
            Go to Learn
          </Link>
          <Link href="/" className="fa-btn-secondary w-full sm:w-auto sm:min-w-[160px]">
            Back to home
          </Link>
        </div>
      </div>
    </main>
  );
};

ErrorPage.getInitialProps = getInitialProps;

export default ErrorPage;
