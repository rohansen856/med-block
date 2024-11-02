"use client"

import { useState } from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { signOut } from "next-auth/react"

import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Icons } from "@/components/icons"

export function RoleSelect() {
  const [selectedOption, setSelectedOption] = useState<string | null>(null)
  const [submitted, setSubmitted] = useState(false)
  const router = useRouter()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (selectedOption) {
      setSubmitted(true)
      if (selectedOption != "patient" && selectedOption != "doctor") return
      router.push(`/verification/${selectedOption}`)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {["doctor", "patient"].map((option) => (
          <div key={option} className="relative">
            <input
              type="radio"
              id={option}
              name="options"
              value={option}
              className="sr-only"
              checked={selectedOption === option}
              onChange={() => setSelectedOption(option)}
            />
            <Label
              htmlFor={option}
              className={`
                    relative flex h-64 w-[350px] cursor-pointer items-center justify-center overflow-hidden
                    rounded-lg border-2 p-6
                    transition-all duration-200 ease-in-out
                    ${
                      selectedOption === option
                        ? "border-primary/50 bg-secondary text-primary"
                        : "border-input bg-background text-foreground hover:bg-accent hover:text-accent-foreground"
                    }
                  `}
            >
              <Image
                src={
                  option === "doctor"
                    ? "/illustrations/doctor-1.svg"
                    : "/illustrations/patient-1.svg"
                }
                alt="#"
                fill
                className={
                  "z-0 object-cover opacity-10 duration-300 hover:scale-105"
                }
              />
              <span className="z-10 text-2xl font-semibold">{option}</span>
            </Label>
          </div>
        ))}
      </div>
      <div className="flex flex-col gap-4 md:flex-row">
        <Button
          onClick={(event) => {
            event.preventDefault()
            signOut({
              callbackUrl: `${window.location.origin}/login`,
            })
          }}
          variant={"destructive"}
          className="w-full py-4 md:w-36"
        >
          Sign Out
        </Button>
        <Button
          type="submit"
          className="peer w-full py-4 text-lg"
          disabled={!selectedOption}
        >
          Proceed
          <Icons.chevronRight className="peer-hover:translate-x-4" />
        </Button>
      </div>
    </form>
  )
}
