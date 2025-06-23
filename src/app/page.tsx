'use client'

import { BrainCircuit, Construction, EarthLock, HardDrive, LayoutTemplate, Sparkle } from 'lucide-react';
import { ReactNode, useState } from 'react';

interface Service {
  title: string
  description: string
  icon: ReactNode
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
          </div>
        )}
      </div>
    </div>
  )
}

// Simple Modal component
function Modal({ isOpen, onClose, children }: { isOpen: boolean; onClose: () => void; children: ReactNode }) {
  if (!isOpen) return null;
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
  );
}

export default function Home() {
  const [expandedService, setExpandedService] = useState<string | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const toggleService = (serviceTitle: string) => {
    setExpandedService(expandedService === serviceTitle ? null : serviceTitle)
  }

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormStatus('submitting');
    try {
      const response = await fetch('https://formspree.io/f/xjkrarpl', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
        },
        body: new FormData(e.currentTarget),
      });
      if (response.ok) {
        setFormStatus('success');
        setFormData({ name: '', email: '', message: '' });
      } else {
        setFormStatus('error');
      }
    } catch {
      setFormStatus('error');
    }
  };

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
                  onClick={() => setIsModalOpen(true)}
                  className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-500 hover:bg-indigo-600 md:py-4 md:text-lg md:px-10"
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
          id='calendly-link'
          src="https://calendly.com/jessehughes/30min"
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
      {/* Formspree Test Form (AJAX, no redirect) */}
      <section className="bg-gray-800 py-20">

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
              Get in Touch
            </h2>
            <p className="mt-4 text-lg text-gray-400">
              Have a question or ready to start your project? Send us a message and one of our experts will get back to you shortly.
            </p>
          </div>
        </div>
        <form onSubmit={handleFormSubmit} className="mt-8 max-w-md mx-auto bg-gray-700 p-6 rounded-lg shadow space-y-4">
          <label className="block text-left text-gray-200">
            Name:
            <input
              type="text"
              name="name"
              required
              value={formData.name}
              onChange={handleFormChange}
              className="mt-1 block w-full rounded-md bg-gray-800 border border-gray-600 text-white p-2"
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
              className="mt-1 block w-full rounded-md bg-gray-800 border border-gray-600 text-white p-2"
            />
          </label>
          <label className="block text-left text-gray-200">
            Message:
            <textarea
              name="message"
              required
              value={formData.message}
              onChange={handleFormChange}
              className="mt-1 block w-full rounded-md bg-gray-800 border border-gray-600 text-white p-2"
            />
          </label>
          <button
            type="submit"
            className="w-full py-2 px-4 bg-indigo-500 hover:bg-indigo-600 text-white font-semibold rounded-md"
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
      </section>
    </div>
  )
}
