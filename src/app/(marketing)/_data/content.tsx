import { BrainCircuit, Building, Construction, EarthLock, HardDrive, LayoutTemplate, Sparkle, Users } from 'lucide-react'
import { ReactNode } from 'react'

export type SectionKey = 'services' | 'about' | 'case-studies'

export interface ContentItem {
  id: string
  title: string
  description: string
  icon: ReactNode
  details: string[]
}

export interface ContentSection {
  key: SectionKey
  label: string
  heading: string
  subheading: string
  items: ContentItem[]
}

export const contentSections: ContentSection[] = [
  {
    key: 'services',
    label: 'Services',
    heading: 'Our Services',
    subheading: 'Tailored solutions, expertly delivered.',
    items: [
      {
        id: 'services-consulting',
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
        id: 'services-ai-integrations',
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
        id: 'services-website-development',
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
        id: 'services-infrastructure-management',
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
        id: 'services-security-assessments',
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
        id: 'services-application-enhancement',
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
  },
  {
    key: 'about',
    label: 'About Us',
    heading: 'About Subtropic',
    subheading: 'Accelerating teams with practical engineering leadership.',
    items: [
      {
        id: 'about-story',
        title: 'Our Story',
        description: 'A team of builders focused on helping companies deliver faster with fewer surprises.',
        icon: <Users />,
        details: [
          '15+ years of shipping production software',
          'Experience from seed startups to the enterprise',
          'Embedded partnership mindset',
          'Remote-first with global reach'
        ]
      },
      {
        id: 'about-approach',
        title: 'How We Work',
        description: 'Outcome-oriented engagements that balance velocity with maintainability.',
        icon: <Sparkle />,
        details: [
          'Discovery to align strategy and execution',
          'Transparent project health reporting',
          'Hands-on collaboration with your team',
          'Seasoned practitioners, not consultants'
        ]
      },
      {
        id: 'about-expertise',
        title: 'Core Expertise',
        description: 'Battle-tested in modern web, cloud, and AI-enabled systems.',
        icon: <BrainCircuit />,
        details: [
          'Full-stack TypeScript product teams',
          'Edge and serverless architectures',
          'LLM and agentic workflows',
          'Cloud cost optimization playbooks'
        ]
      },
    ]
  },
  {
    key: 'case-studies',
    label: 'Case Studies',
    heading: 'Case Studies',
    subheading: 'Real-world outcomes from recent partnerships.',
    items: [
      {
        id: 'case-ops-automation',
        title: 'Operations Automation',
        description: 'Scaled a logistics platform by automating dispatch and compliance workflows.',
        icon: <Building />,
        details: [
          '90% reduction in manual dispatcher interventions',
          'Near real-time fleet visibility dashboards',
          'Stable integrations with incumbent ERP systems',
          'Rollout completed without service disruption'
        ]
      },
      {
        id: 'case-ai-support',
        title: 'AI Support Agents',
        description: 'Embedded LLM-powered copilots into customer support queues.',
        icon: <Sparkle />,
        details: [
          'Deflected 40% of inbound requests',
          'Improved CSAT scores within one quarter',
          'Reduced handle time by 30%',
          'Established continuous evaluation loops'
        ]
      },
      {
        id: 'case-commerce-rebuild',
        title: 'Commerce Rebuild',
        description: 'Replatformed a legacy storefront for a scaling D2C brand.',
        icon: <LayoutTemplate />,
        details: [
          'Headless commerce architecture on modern stack',
          'Core web vitals improved across the board',
          'Integrated subscription and loyalty programs',
          'Delivered in time for launch with 0 downtime'
        ]
      },
    ]
  }
]
