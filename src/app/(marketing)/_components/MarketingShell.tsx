'use client'

import Link from 'next/link'
import { ReactNode, useEffect, useMemo, useState } from 'react'

import { contentSections, ContentItem, ContentSection, SectionKey } from '../_data/content'

interface MarketingShellProps {
  activeSection: SectionKey
}

interface ContentTileProps {
  item: ContentItem
  isExpanded: boolean
  onToggle: (id: string) => void
}

function ContentTile({ item, isExpanded, onToggle }: ContentTileProps) {
  return (
    <div
      className={`relative pt-6 bg-gray-800 rounded-lg shadow-lg overflow-hidden transition-all duration-300 ${
        isExpanded ? 'col-span-full row-span-2' : ''
      }`}
      onClick={() => onToggle(item.id)}
    >
      <div className={`px-6 pb-8 ${isExpanded ? 'h-full' : ''}`}>
        <div className="flex items-start justify-between">
          <div className="text-4xl mb-4">{item.icon}</div>
          <button
            className={`text-gray-400 hover:text-gray-300 transition-colors ${isExpanded ? 'rotate-45' : ''}`}
            onClick={(e) => {
              e.stopPropagation()
              onToggle(item.id)
            }}
            aria-label={isExpanded ? 'Collapse details' : 'Expand details'}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
          </button>
        </div>
        <h3 className="text-lg font-medium text-white">
          {item.title}
        </h3>
        <p className="mt-2 text-base text-gray-400">
          {item.description}
        </p>
        {isExpanded && (
          <div className="mt-6 space-y-4">
            <h4 className="text-md font-semibold text-white">Highlights:</h4>
            <ul className={`space-y-2 ${item.details.length > 4 ? 'grid grid-cols-2 gap-x-4' : ''}`}>
              {item.details.map((detail, index) => (
                <li key={index} className="flex items-start">
                  <svg className="h-5 w-5 text-indigo-400 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-300">{detail}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  )
}

function Modal({ isOpen, onClose, children }: { isOpen: boolean; onClose: () => void; children: ReactNode }) {
  if (!isOpen) return null
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center" style={{ background: 'rgba(20, 20, 30, 0.10)' }}>
      <div className="bg-white dark:bg-gray-900 rounded-lg shadow-2xl max-w-5xl w-full h-[90vh] relative flex flex-col">
        <button
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 text-2xl z-10"
          onClick={onClose}
          aria-label="Close"
        >
          &times;
        </button>
        <div className="flex-1 flex flex-col justify-center items-center">
          {children}
        </div>
      </div>
    </div>
  )
}

const sectionHref: Record<SectionKey, string> = {
  services: '/services',
  about: '/about',
  'case-studies': '/case-studies',
}

export default function MarketingShell({ activeSection }: MarketingShellProps) {
  const [expandedItem, setExpandedItem] = useState<string | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [formData, setFormData] = useState({ name: '', email: '', message: '' })
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')

  useEffect(() => {
    setExpandedItem(null)
  }, [activeSection])

  const currentSection: ContentSection = useMemo(() => {
    return contentSections.find((section) => section.key === activeSection) ?? contentSections[0]
  }, [activeSection])

  const orderedItems = useMemo(() => {
    if (!expandedItem) {
      return currentSection.items
    }

    const expandedContent = currentSection.items.find((item) => item.id === expandedItem)
    if (!expandedContent) {
      return currentSection.items
    }

    return [expandedContent, ...currentSection.items.filter((item) => item.id !== expandedContent.id)]
  }, [currentSection, expandedItem])

  const toggleService = (itemId: string) => {
    setExpandedItem((prev) => (prev === itemId ? null : itemId))
  }

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setFormStatus('submitting')
    try {
      const response = await fetch('https://formspree.io/f/xjkrarpl', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
        },
        body: new FormData(e.currentTarget),
      })
      if (response.ok) {
        setFormStatus('success')
        setFormData({ name: '', email: '', message: '' })
      } else {
        setFormStatus('error')
      }
    } catch {
      setFormStatus('error')
    }
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-900">
      {/* Hero Section */}
      <section
        className="relative bg-gray-800 py-20 text-white overflow-hidden"
        style={{
          backgroundImage: 'radial-gradient(circle at top center, rgba(255,255,255,0.05), rgba(15,23,42,1) 80%), linear-gradient(135deg, #1e3a8a, #0f172a)',
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center">
            <h1
              className="text-4xl tracking-tight font-extrabold text-white sm:text-5xl md:text-6xl"
              style={{ textShadow: '0 0 20px rgba(99,102,241,0.5)' }}
            >
              <span className="block">Subtropic Technologies</span>
            </h1>

            <span
              className="block mt-2 text-lg font-normal sm:text-xl md:text-2xl"
              style={{
                background: 'linear-gradient(to right, #60a5fa, #a78bfa)',
                WebkitBackgroundClip: 'text',
                color: 'transparent',
              }}
            >
              Delivered. Operational. Scalable.
            </span>

            <div className="h-1 w-24 bg-gradient-to-r from-sky-400 to-purple-400 mx-auto my-6 rounded-full"></div>

            <p className="mt-3 max-w-md mx-auto text-base text-gray-400 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
              Transforming ideas into robust, scalable solutions through expert consulting, seamless development, and reliable infrastructure management.
            </p>

            <div className="max-w-md mx-auto sm:flex sm:justify-center mt-12">
              <div className="rounded-md shadow">
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-500 hover:bg-indigo-600 hover:scale-105 transition-transform duration-200 md:py-4 md:text-lg md:px-10"
                >
                  Book a Consultation
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Modal for Calendly event */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <iframe
          id="calendly-link"
          src="https://calendly.com/jessehughes/60min"
          width="100%"
          height="100%"
          frameBorder="0"
          allow="camera; microphone; fullscreen"
          title="Book a Consultation"
          className="rounded-b-lg min-h-[700px]"
          style={{ minHeight: '700px', border: 'none' }}
        />
      </Modal>

      {/* Services Section */}
      <section className="py-12 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
              {currentSection.heading}
            </h2>
            <p className="mt-4 text-lg text-gray-400">
              {currentSection.subheading}
            </p>
          </div>

          <div className="mt-8 flex flex-wrap justify-center gap-4">
            {contentSections.map((section) => (
              <Link
                key={section.key}
                href={sectionHref[section.key]}
                className={`px-4 py-2 rounded-full border transition-all duration-200 ${
                  activeSection === section.key
                    ? 'bg-indigo-500 border-indigo-400 text-white shadow-lg shadow-indigo-500/30'
                    : 'bg-gray-800 border-gray-700 text-gray-300 hover:text-white hover:border-indigo-400'
                }`}
                aria-pressed={activeSection === section.key}
              >
                {section.label}
              </Link>
            ))}
          </div>

          <div className="mt-10">
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 auto-rows-fr">
              {orderedItems.map((item) => (
                <ContentTile
                  key={item.id}
                  item={item}
                  isExpanded={expandedItem === item.id}
                  onToggle={toggleService}
                />
              ))}
            </div>
          </div>

          <div className="sr-only" aria-live="polite">
            Viewing {currentSection.label}
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section
        className="relative py-20 text-white overflow-hidden"
        style={{
          backgroundImage: 'radial-gradient(circle at bottom center, rgba(255,255,255,0.03), rgba(15,23,42,1) 80%), linear-gradient(315deg, #0f172a, #1e3a8a)',
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold sm:text-4xl">Get in Touch</h2>
            <p className="mt-4 text-lg text-gray-400">
              Have a question or ready to start your project? Send us a message and one of our experts will get back to you shortly.
            </p>
          </div>

          <form
            onSubmit={handleFormSubmit}
            className="mt-10 max-w-xl mx-auto p-6 space-y-4"
          >
            <label className="block text-left text-gray-200">
              Name:
              <input
                type="text"
                name="name"
                required
                value={formData.name}
                onChange={handleFormChange}
                className="mt-1 w-full rounded-md bg-gray-900 border border-gray-700 text-white p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </label>

            <label className="block text-left text-gray-200">
              Email:
              <input
                type="email"
                name="email"
                required
                value={formData.email}
                onChange={handleFormChange}
                className="mt-1 w-full rounded-md bg-gray-900 border border-gray-700 text-white p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </label>

            <label className="block text-left text-gray-200">
              Message:
              <textarea
                name="message"
                required
                value={formData.message}
                onChange={handleFormChange}
                className="mt-1 w-full rounded-md bg-gray-900 border border-gray-700 text-white p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                rows={5}
              />
            </label>

            <button
              type="submit"
              className="w-full py-3 px-4 bg-indigo-500 hover:bg-indigo-600 text-white font-semibold rounded-md transition-transform transform hover:scale-105"
              disabled={formStatus === 'submitting'}
            >
              {formStatus === 'submitting' ? 'Sending...' : 'Send'}
            </button>

            {formStatus === 'success' && (
              <p className="text-green-400 text-center mt-2">Thank you! Your message has been sent.</p>
            )}
            {formStatus === 'error' && (
              <p className="text-red-400 text-center mt-2">Oops! Something went wrong. Please try again.</p>
            )}
          </form>
        </div>
      </section>
      <footer
        className="text-gray-400 text-sm pt-0 pb-4"
        style={{
          backgroundImage: 'radial-gradient(circle at bottom center, rgba(255,255,255,0.03), rgba(15,23,42,1) 80%), linear-gradient(315deg, #0f172a, #1e3a8a)',
        }}
      >
        <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
          <span>© {new Date().getFullYear()} Subtropic Technologies. All rights reserved.</span>
          <div className="flex space-x-4">
            <a
              href="https://linkedin.com/in/hughesjesse"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="hover:text-white transition-colors"
            >
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                <path d="M4.98 3.5a2.5 2.5 0 11.02 5 2.5 2.5 0 01-.02-5zM4 8h3v12H4V8zm5 0h3v1.5h.04a3.3 3.3 0 013-1.65c3.22 0 3.82 2.12 3.82 4.87V20h-3v-6.5c0-1.56-.03-3.57-2.18-3.57-2.2 0-2.54 1.72-2.54 3.45V20h-3V8z" />
              </svg>
            </a>
            <a
              href="https://github.com/Jesse-Lee-Hughes"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="hover:text-white transition-colors"
            >
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12c0 4.42 2.87 8.16 6.84 9.49.5.09.68-.22.68-.49 0-.24-.01-.87-.01-1.71-2.78.6-3.37-1.34-3.37-1.34-.46-1.17-1.12-1.48-1.12-1.48-.92-.62.07-.61.07-.61 1.02.07 1.56 1.05 1.56 1.05.9 1.55 2.36 1.1 2.93.84.09-.65.35-1.1.63-1.35-2.22-.25-4.56-1.11-4.56-4.93 0-1.09.39-1.99 1.03-2.69-.1-.25-.45-1.27.1-2.65 0 0 .84-.27 2.75 1.02A9.54 9.54 0 0112 6.8c.85.004 1.7.115 2.5.337 1.9-1.29 2.74-1.02 2.74-1.02.56 1.38.21 2.4.11 2.65.64.7 1.02 1.6 1.02 2.69 0 3.83-2.34 4.67-4.57 4.92.36.31.69.92.69 1.85 0 1.34-.01 2.42-.01 2.75 0 .27.18.59.69.49A10.002 10.002 0 0022 12c0-5.52-4.48-10-10-10z" />
              </svg>
            </a>
          </div>
        </div>
      </footer>
    </div>
  )
}
