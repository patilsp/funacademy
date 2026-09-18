import type { NextPage } from "next";
import Link from "next/link";

const ServerError: NextPage = () => {
  return (
    <main className="fa-bg-aurora fa-bg-dots flex min-h-screen flex-col items-center justify-center bg-canvas px-4 text-ink">
      <div className="fa-card w-full max-w-md p-8 text-center sm:p-10">
        <div className="fa-badge-neutral mx-auto mb-5 w-fit">500</div>
        <h1 className="fa-h1 mb-3">Something went wrong</h1>
        <p className="fa-sub mb-8">
          An unexpected error occurred on our side. Please try again in a
          moment.
        </p>
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

export default ServerError;
