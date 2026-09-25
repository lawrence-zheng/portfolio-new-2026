"use client"

import type React from "react"

import { useEffect, useState } from "react"
import * as DialogPrimitive from "@radix-ui/react-dialog"
import { X } from "lucide-react"
import {
  Dialog,
  DialogClose,
  DialogDescription,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
} from "@/components/ui/dialog"
import { useColorContext } from "@/context/color-context"
import { unlockCaseStudy } from "@/lib/case-study-access"

interface PasswordModalProps {
  /** The case study being unlocked; null keeps the modal closed. */
  project: { id: string; title: string; company?: string } | null
  onClose: () => void
  onUnlock: (projectId: string) => void
}

export default function PasswordModal({ project, onClose, onUnlock }: PasswordModalProps) {
  const { primaryColor } = useColorContext()
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")

  // Start fresh each time a different case study is opened
  useEffect(() => {
    setPassword("")
    setError("")
  }, [project?.id])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!project) return
    if (unlockCaseStudy(project.id, password)) {
      onUnlock(project.id)
    } else {
      setError("That password didn't work. Please try again.")
    }
  }

  return (
    <Dialog open={project !== null} onOpenChange={(open) => !open && onClose()}>
      <DialogPortal>
        <DialogOverlay className="bg-black/40" />
        <DialogPrimitive.Content className="fixed inset-0 z-50 m-auto grid h-fit w-[calc(100%-2rem)] max-w-md gap-6 rounded-md border border-gray-200 bg-white p-8 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0">
          <div>
            <p
              className="font-sans text-xs font-medium uppercase tracking-[0.15em] mb-2 inline-flex items-center gap-1.5"
              style={{ color: primaryColor }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
              </svg>
              Password required{project?.company ? ` · ${project.company}` : ""}
            </p>
            <DialogTitle className="font-serif font-normal tracking-tight normal-case text-balance text-2xl md:text-[1.75rem] leading-tight text-black">
              {project?.title}
            </DialogTitle>
            <DialogDescription className="font-sans text-base leading-relaxed text-gray-700 mt-3">
              Enter the password to view this case study.
            </DialogDescription>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="case-study-password" className="sr-only">
                Password
              </label>
              <input
                type="password"
                id="case-study-password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value)
                  setError("")
                }}
                className="w-full px-4 py-3 font-sans text-base border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:border-transparent"
                style={{ "--tw-ring-color": primaryColor } as React.CSSProperties}
                placeholder="Password"
                autoFocus
                required
              />
              {error && <p className="mt-2 font-sans text-sm text-red-600">{error}</p>}
            </div>

            <button
              type="submit"
              className="w-full inline-flex justify-center items-center gap-2 px-6 py-3 text-white rounded-md font-sans text-base font-medium hover:opacity-90 transition-opacity"
              style={{ backgroundColor: primaryColor }}
            >
              View case study
              <span aria-hidden="true">→</span>
            </button>
          </form>

          <DialogClose className="absolute right-4 top-4 rounded-sm text-gray-500 hover:text-gray-900 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-400">
            <X className="h-4 w-4" />
            <span className="sr-only">Close</span>
          </DialogClose>
        </DialogPrimitive.Content>
      </DialogPortal>
    </Dialog>
  )
}
