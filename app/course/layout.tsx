import { Metadata } from "next"
import Image from "next/image"

interface SettingsLayoutProps {
  children: React.ReactNode
}

export default function SettingsLayout({ children }: SettingsLayoutProps) {
  return (
    <>
      <div className="space-y-6 p-10 pb-16 sm:mb-20 md:mb-1 md:block">
        {/* <div className="space-y-0.5">
          <h2 className="text-2xl font-bold tracking-tight">Settings</h2>
          <p className="text-muted-foreground">
            Manage your account settings and set e-mail preferences.
          </p>
        </div> */}
        <div className="flex w-full items-center justify-center">          
          <div className="flex-1">{children}</div>
        </div>
      </div>
    </>
  )
}
