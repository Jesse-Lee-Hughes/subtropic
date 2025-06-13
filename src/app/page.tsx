'use client'

import { useEffect, useState } from 'react'
import { Sparkle, BrainCircuit, LayoutTemplate, HardDrive, EarthLock, Construction } from 'lucide-react';
interface Service {
  title: string
  description: string
  icon: any
  details: string[]
}

interface ServiceTileProps {
  service: Service
  isExpanded: boolean
  onToggle: (title: string) => void
}

const services: Service[] = [
  {
    title: 'Consulting',
    description: 'Expert guidance on technology strategy, architecture, and implementation.',
    icon: <Sparkle />,
    details: [
      'Technology strategy development',
      'Architecture design and review',
      'Technical due diligence',
      'Process optimization',
      'Team structure and scaling advice',
      'Product development'
    ]
  },
  {
    title: 'AI System Integrations',
    description: 'Integrate AI systems into your existing applications and infrastructure.',
    icon: <BrainCircuit />,
    details: [
      'Agentic AI development',
      'LLM integration and fine-tuning',
      'AI model deployment and scaling',
      'Custom AI solution development',
      'Existing system enhancement with AI',
      'AI infrastructure optimization'
    ]
  },
  {
    title: 'Website Development',
    description: 'Modern, responsive, and performant web applications built with cutting-edge technologies.',
    icon: <LayoutTemplate />,
    details: [
      'Full-stack web application development',
      'Progressive Web Apps (PWA)',
      'E-commerce solutions',
      'API development and integration',
      'Performance optimization',
      'Chatbot integration',
      'SASS product integration (Shopify, Calendly, etc.)'
    ]
  },
  {
    title: 'Infrastructure Management',
    description: 'Robust cloud infrastructure setup and management for optimal performance.',
    icon: <HardDrive />,
    details: [
      'Cloud architecture design',
      'Infrastructure as Code (IaC)',
      'DevOps implementation',
      'Monitoring and alerting setup',
      'Cost optimization'
    ]
  },
  {
    title: 'Security Assessments',
    description: 'Comprehensive security reviews and vulnerability assessments.',
    icon: <EarthLock />,
    details: [
      'Security architecture review',
      'Vulnerability assessment',
      'Penetration testing',
      'Security compliance review',
      'Security best practices implementation'
    ]
  },
  {
    title: 'Application Enhancement',
    description: 'Improve and optimize your existing applications for better performance and user experience.',
    icon: <Construction />,
    details: [
      'Performance optimization',
      'Code refactoring',
      'Technical debt reduction',
      'Feature enhancement',
      'Legacy system modernization'
    ]
  },
]

// Client component for Calendly widget
function CalendlyWidget() {
  useEffect(() => {
    // Load Calendly script
    const script = document.createElement('script')
    script.src = 'https://assets.calendly.com/assets/external/widget.js'
    script.async = true
    document.body.appendChild(script)

    return () => {
      // Cleanup script on component unmount
      document.body.removeChild(script)
    }
  }, [])

  return (
    <div
      className="calendly-inline-widget w-full h-[600px]"
      data-url="https://calendly.com/jessehughes"
    />
  )
}

function ServiceTile({ service, isExpanded, onToggle }: ServiceTileProps) {
  return (
    <div
      className={`relative pt-6 bg-gray-800 rounded-lg shadow-lg overflow-hidden transition-all duration-300 ${isExpanded ? 'col-span-full row-span-2' : ''
        }`}
      onClick={() => onToggle(service.title)}
    >
      <div className={`px-6 pb-8 ${isExpanded ? 'h-full' : ''}`}>
        <div className="flex items-start justify-between">
          <div className="text-4xl mb-4">{service.icon}</div>
          <button
            className={`text-gray-400 hover:text-gray-300 transition-colors ${isExpanded ? 'rotate-45' : ''
              }`}
            onClick={(e) => {
              e.stopPropagation()
              onToggle(service.title)
            }}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
              />
            </svg>
          </button>
        </div>
        <h3 className="text-lg font-medium text-white">
          {service.title}
        </h3>
        <p className="mt-2 text-base text-gray-400">
          {service.description}
        </p>
        {isExpanded && (
          <div className="mt-6 space-y-4">
            <h4 className="text-md font-semibold text-white">What I Offer:</h4>
            <ul className={`space-y-2 ${service.details.length > 4 ? 'grid grid-cols-2 gap-x-4' : ''}`}>
              {service.details.map((detail: string, index: number) => (
                <li key={index} className="flex items-start">
                  <svg
                    className="h-5 w-5 text-indigo-400 mr-2 mt-0.5 flex-shrink-0"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <span className="text-gray-300">{detail}</span>
                </li>
              ))}
            </ul>
            <div className="mt-6">
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  const calendlySection = document.getElementById('calendly-section')
                  calendlySection?.scrollIntoView({ behavior: 'smooth' })
                }}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-500 hover:bg-indigo-600"
              >
                Book a Consultation
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default function Home() {
  const [expandedService, setExpandedService] = useState<string | null>(null)

  const toggleService = (serviceTitle: string) => {
    setExpandedService(expandedService === serviceTitle ? null : serviceTitle)
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-900">
      {/* Hero Section */}
      <section className="bg-gray-800 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl tracking-tight font-extrabold text-white sm:text-5xl md:text-6xl">
              <span className="block">Subtropic Technologies</span>
              <span className="text-indigo-400 opacity-70 text-lg font-normal sm:text-xl md:text-2xl">
                Delivered. Operational. Scalable.
              </span>
            </h1>
            <p className="mt-3 max-w-md mx-auto text-base text-gray-400 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
              Transforming ideas into robust, scalable solutions through expert consulting, seamless development, and reliable infrastructure management.
            </p>
            <div className="mt-5 max-w-md mx-auto sm:flex sm:justify-center md:mt-8">
              <div className="rounded-md shadow">
                <button
                  onClick={() => {
                    const calendlySection = document.getElementById('calendly-section')
                    calendlySection?.scrollIntoView({ behavior: 'smooth' })
                  }}
                  className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-500 hover:bg-indigo-600 md:py-4 md:text-lg md:px-10"
                >
                  Book a Consultation
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-12 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
              Our Services
            </h2>
            <p className="mt-4 text-lg text-gray-400">
              Tailored solutions, expertly delivered.
            </p>
          </div>

          <div className="mt-10">
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 auto-rows-fr">
              {services.map((service) => (
                <ServiceTile
                  key={service.title}
                  service={service}
                  isExpanded={expandedService === service.title}
                  onToggle={toggleService}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Calendly Section */}
      <section id="calendly-section" className="bg-gray-800 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
              Schedule a Consultation
            </h2>
            <p className="mt-4 text-lg text-gray-400">
              Choose a time that works best for you
            </p>
          </div>
          <div className="bg-gray-800 rounded-lg shadow-xl overflow-hidden">
            <CalendlyWidget />
          </div>
        </div>
      </section>
    </div>
  )
}
