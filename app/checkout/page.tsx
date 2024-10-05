import { Input } from "@/components/ui/input"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { Button } from "@/components/ui/button"

export default function Checkout() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[#f6f6f6] p-4  dark:bg-black">
      <div className="flex w-full max-w-5xl flex-col overflow-hidden rounded-lg bg-white shadow-lg md:flex-row">
        <div className="flex w-full flex-col justify-center bg-blue-900 p-8 text-white md:w-1/2">
        <div className="mb-4 flex items-center">
            <RocketIcon className="size-12 text-white" /> 
          </div>
          <div className="mb-4 flex items-center">
                <h1 className="text-4xl font-bold text-[#ffc854]">Fun Academy </h1>
          </div>
         
          <h1 className="mb-4 text-xl font-bold">Supercharge your learning</h1>
          <ul className="space-y-2">
            <li className="flex items-center">
              <BarChartIcon className="mr-2 size-6 text-yellow-400" />
              70+ courses in math, programming, data analysis, computer science, and more
            </li>
            <li className="flex items-center">
              <DoorClosedIcon className="mr-2 size-6 text-yellow-400" />
              No in-app purchases or ads
            </li>
            <li className="flex items-center">
              <StarIcon className="mr-2 size-6 text-yellow-400" />
              New content added regularly
            </li>
            <li className="flex items-center">
              <FolderSyncIcon className="mr-2 size-6 text-yellow-400" />
              One subscription across all devices
            </li>
          </ul>
        </div>
        <div className="flex w-full flex-col p-8 dark:bg-slate-950 dark:text-white md:w-1/2">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-xl font-bold">Total Today</h2>
            <span className="text-2xl font-bold">₹1,999.00</span>
          </div>
          <a href="#" className="mb-4 text-blue-600">
            View details
          </a>
          <h3 className="mb-4 text-lg font-semibold">Payment method</h3>
          <div className="space-y-4">
            <Input type="text" placeholder="Card number" className="w-full" />
            <div className="flex space-x-2">
              <Input type="text" placeholder="Expiration date" className="w-1/2" />
              <Input type="text" placeholder="Security code" className="w-1/2" />
            </div>
            <Select>
              <SelectTrigger id="country" aria-label="Country">
                <SelectValue placeholder="Country" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="India">India</SelectItem>
                <SelectItem value="USA">USA</SelectItem>
                <SelectItem value="UK">UK</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <p className="mt-4 text-sm text-muted-foreground">
            By providing your card information, you allow Brilliant Worldwide, Inc. to charge your card for future
            payments in accordance with their terms.
          </p>
          <Button className="mt-4 w-full">
            Subscribe <LockIcon className="ml-2 size-4" />
          </Button>
          <p className="mt-4 text-sm text-muted-foreground">
            Recurring billing, cancel anytime
            <br />
            Subscription renews automatically at the end of term. You can turn off auto-renew from your settings. You
            may cancel anytime.
          </p>
        </div>
      </div>
    </div>
  )
}

function BarChartIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="12" x2="12" y1="20" y2="10" />
      <line x1="18" x2="18" y1="20" y2="4" />
      <line x1="6" x2="6" y1="20" y2="16" />
    </svg>
  )
}


function DoorClosedIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M18 20V6a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v14" />
      <path d="M2 20h20" />
      <path d="M14 12v.01" />
    </svg>
  )
}


function FolderSyncIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M9 20H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h3.9a2 2 0 0 1 1.69.9l.81 1.2a2 2 0 0 0 1.67.9H20a2 2 0 0 1 2 2v.5" />
      <path d="M12 10v4h4" />
      <path d="m12 14 1.535-1.605a5 5 0 0 1 8 1.5" />
      <path d="M22 22v-4h-4" />
      <path d="m22 18-1.535 1.605a5 5 0 0 1-8-1.5" />
    </svg>
  )
}


function LockIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
  )
}


function RocketIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" />
      <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
      <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" />
      <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
    </svg>
  )
}


function StarIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  )
}