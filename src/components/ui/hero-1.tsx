'use client'

import { useState, useEffect } from 'react'
import { Dialog, DialogContent } from '@/components/ui/dialog'
import { Menu, X, ArrowRight } from 'lucide-react'

interface NavigationItem {
  name: string
  href: string
  onClick?: () => void
}

interface CallToAction {
  text: string
  onClick?: () => void
  variant: 'primary' | 'secondary'
}

interface HeroLandingProps {
  logo?: {
    src: string
    alt: string
  }
  navigation?: NavigationItem[]
  title: string
  subtitle?: string
  description: string
  callToActions?: CallToAction[]
  gradientColors?: {
    from: string
    to: string
  }
  className?: string
}

export function HeroLanding({
  logo,
  navigation = [],
  title,
  subtitle,
  description,
  callToActions = [],
  gradientColors = {
    from: '#A01010',
    to: '#800000'
  },
  className = ''
}: HeroLandingProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  // Track scroll for sticky navbar effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleNavClick = (item: NavigationItem) => {
    if (item.onClick) {
      item.onClick()
    } else if (item.href.startsWith('#')) {
      const element = document.getElementById(item.href.replace('#', ''))
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' })
      }
    }
    setMobileMenuOpen(false)
  }

  const scrollToHome = () => {
    const home = document.getElementById('home')
    if (home) home.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div className={`min-h-screen w-full overflow-hidden relative bg-background ${className}`}>
      {/* Top gradient background - Maroon theme with higher opacity */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
      >
        <div
          style={{
            clipPath:
              'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
            background: `linear-gradient(to top right, ${gradientColors.from}, ${gradientColors.to})`
          }}
          className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] max-w-none -translate-x-1/2 rotate-[30deg] opacity-50 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
        />
      </div>
      
      {/* Bottom gradient background */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
      >
        <div
          style={{
            clipPath:
              'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
            background: `linear-gradient(to top right, ${gradientColors.to}, ${gradientColors.from})`
          }}
          className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] max-w-none -translate-x-1/2 opacity-40 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
        />
      </div>

      {/* STICKY Header/Navigation */}
      <header 
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
          scrolled 
            ? 'bg-background/80 backdrop-blur-xl shadow-lg border-b border-border/50' 
            : 'bg-transparent'
        }`}
      >
        <nav aria-label="Global" className="flex items-center justify-between p-4 sm:p-6 lg:px-8">
          {/* Logo */}
          <div className="flex lg:flex-1">
            <button onClick={scrollToHome} className="-m-1.5 p-1.5 cursor-pointer">
              <span className="sr-only">Liceo EdTech</span>
              {logo?.src && (
                <img
                  alt={logo.alt}
                  src={logo.src}
                  className="h-10 sm:h-12 w-auto transition-transform duration-300 hover:scale-110"
                />
              )}
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="flex lg:hidden">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(true)}
              className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-muted-foreground hover:text-foreground transition-colors"
            >
              <span className="sr-only">Open main menu</span>
              <Menu aria-hidden="true" className="size-6" />
            </button>
          </div>

          {/* Desktop Navigation */}
          {navigation.length > 0 && (
            <div className="hidden lg:flex lg:gap-x-8 xl:gap-x-12">
              {navigation.map((item) => (
                <button
                  key={item.name}
                  onClick={() => handleNavClick(item)}
                  className="text-sm font-semibold text-foreground hover:text-primary transition-colors cursor-pointer"
                >
                  {item.name}
                </button>
              ))}
            </div>
          )}

          <div className="hidden lg:flex lg:flex-1 lg:justify-end" />
        </nav>

        {/* Mobile Menu Dialog */}
        <Dialog open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
          <DialogContent 
            className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto px-4 py-4 sm:px-6 sm:py-6 sm:max-w-sm lg:hidden bg-card border-l border-border"
          >
            <div className="flex items-center justify-between">
              <button onClick={scrollToHome} className="-m-1.5 p-1.5">
                <span className="sr-only">Liceo EdTech</span>
                {logo?.src && (
                  <img
                    alt={logo.alt}
                    src={logo.src}
                    className="h-8 w-auto"
                  />
                )}
              </button>
              <button
                type="button"
                onClick={() => setMobileMenuOpen(false)}
                className="-m-2.5 rounded-md p-2.5 text-muted-foreground hover:text-foreground transition-colors"
              >
                <span className="sr-only">Close menu</span>
                <X aria-hidden="true" className="size-6" />
              </button>
            </div>
            <div className="mt-6 flow-root">
              <div className="-my-6 divide-y divide-border">
                {navigation.length > 0 && (
                  <div className="space-y-2 py-6">
                    {navigation.map((item) => (
                      <button
                        key={item.name}
                        onClick={() => handleNavClick(item)}
                        className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold text-card-foreground hover:bg-accent hover:text-accent-foreground transition-colors w-full text-left"
                      >
                        {item.name}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </header>

      {/* Hero Content */}
      <div className="relative isolate px-6 pt-4 overflow-hidden min-h-screen flex flex-col justify-center">        
        <div className="mx-auto max-w-4xl pt-20 sm:pt-25">
          {/* Subtitle Badge */}
          {subtitle && (
            <div className="mb-6 flex justify-center animate-fade-in">
              <div className="relative rounded-full px-4 py-2 text-sm text-muted-foreground ring-1 ring-border hover:ring-ring transition-all">
                🎓 {subtitle}
              </div>
            </div>
          )}
          
          <div className="text-center">
            {/* Main Title */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold tracking-tight text-balance text-foreground animate-fade-in">
              {title}
            </h1>

            {/* Description */}
            <p className="mt-6 sm:mt-8 text-lg sm:text-xl font-medium text-pretty text-muted-foreground max-w-2xl mx-auto animate-fade-in">
              {description}
            </p>
            
            {/* Call to Action Buttons */}
            {callToActions.length > 0 && (
              <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in">
                {callToActions.map((cta, index) => (
                  cta.variant === 'primary' ? (
                    <button
                      key={index}
                      onClick={cta.onClick}
                      className="rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-sm hover:bg-primary/90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring transition-all hover:scale-[1.02]"
                    >
                      {cta.text}
                    </button>
                  ) : (
                    <button
                      key={index}
                      onClick={cta.onClick}
                      className="text-sm font-semibold text-foreground hover:text-muted-foreground transition-colors flex items-center gap-2"
                    >
                      {cta.text} <ArrowRight className="w-4 h-4" />
                    </button>
                  )
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* CSS Animations */}
      <style>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fade-in 0.6s ease-out forwards;
        }
      `}</style>
    </div>
  )
}

export type { HeroLandingProps, NavigationItem, CallToAction }
