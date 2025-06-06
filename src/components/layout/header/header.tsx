"use client"

import Image from "next/image"
import { useRouter } from "next/navigation"
import {
  HelpCircle,
  Search,
  Settings,
  ArrowRightLeft,
  BookOpen,
  LayoutGrid,
  Grid3X3,
  LogOut,
} from "lucide-react"
import { Input } from "@/components/ui/input"
import { MobileMenu } from "./mobile-menu"
import { Button } from "@/components/ui/button"
import { useWalletStore } from "@/store/wallet-store"

interface HeaderProps {
  onCreateWallet: () => void
  onLogin: () => void
}

export function Header({ onCreateWallet, onLogin }: HeaderProps) {
  const router = useRouter()
  const publicKey = useWalletStore((state) => state.publicKey)
  const setPublicKey = useWalletStore((state) => state.setPublicKey)

  const menuOptions = [
    { label: "Converter", icon: <ArrowRightLeft className="h-4 w-4" />, href: "/converter" },
    { label: "Learn", icon: <BookOpen className="h-4 w-4" />, href: "/education-center" },
    { label: "Portfolio", icon: <LayoutGrid className="h-4 w-4" />, href: "/portfolio" },
    { label: "Widgets", icon: <Grid3X3 className="h-4 w-4" />, href: "/widgets" },
    { label: "Support", icon: <HelpCircle className="h-4 w-4" />, href: "/support" },
    { label: "Settings", icon: <Settings className="h-4 w-4" />, href: "/settings" },
  ]

  const handleLogout = () => {
    setPublicKey("")
    router.push("/")
  }

  return (
    <header className="sticky top-0 z-50 w-full backdrop-blur-md border-b border-gray-800 py-3 px-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => router.push("/")}>
          <Image
            src="/images/galaxy-smart-wallet-logo.png"
            alt="Galaxy Smart Wallet Logo"
            width={40}
            height={40}
            className="object-contain"
          />
          <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
            Galaxy Smart Wallet
          </h1>
        </div>

        <nav className="hidden md:flex items-center space-x-6">
          {menuOptions.map((option) => (
            <button
              key={option.label}
              className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors"
              onClick={() => router.push(option.href)}
            >
              {option.icon}
              <span>{option.label}</span>
            </button>
          ))}
        </nav>

        <div className="hidden lg:flex items-center gap-4">
          <div className="relative w-64">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search transactions..."
              className="pl-10 bg-gray-900/50 border-gray-800 focus:border-purple-500 text-white rounded-full"
            />
          </div>

          {!publicKey ? (
            <>
              <Button onClick={onLogin}>Login</Button>
              <Button onClick={onCreateWallet}>Create Wallet</Button>
            </>
          ) : (
            <Button
              variant="outline"
              onClick={handleLogout}
              className="border-gray-700 text-gray-300 hover:text-white hover:border-gray-500"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          )}
        </div>

        <div className="md:hidden">
          <MobileMenu options={menuOptions} />
        </div>
      </div>
    </header>
  )
}
