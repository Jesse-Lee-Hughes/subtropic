import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import Home from '../app/page'

describe('Home page', () => {
  beforeEach(() => {
    jest.restoreAllMocks()
    global.fetch = jest.fn() as unknown as typeof fetch
  })

  it('renders the hero content', () => {
    render(<Home />)

    expect(screen.getByRole('heading', { name: 'Subtropic Technologies' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Book a Consultation' })).toBeInTheDocument()
  })

  it('expands a service tile when toggled', async () => {
    render(<Home />)

    const consultingTile = screen.getByText('Consulting')
    fireEvent.click(consultingTile)

    await waitFor(() => {
      expect(screen.getByText('What I Offer:')).toBeInTheDocument()
    })
  })

  it('opens the booking modal via the CTA button', () => {
    render(<Home />)

    fireEvent.click(screen.getByRole('button', { name: 'Book a Consultation' }))

    expect(screen.getByTitle('Book a Consultation')).toBeInTheDocument()
  })

  it('submits the contact form and shows success feedback', async () => {
    const fetchMock = jest.fn().mockResolvedValue({ ok: true })
    global.fetch = fetchMock as unknown as typeof fetch

    render(<Home />)

    fireEvent.change(screen.getByLabelText('Name:'), { target: { value: 'Alex' } })
    fireEvent.change(screen.getByLabelText('Email:'), { target: { value: 'alex@example.com' } })
    fireEvent.change(screen.getByLabelText('Message:'), { target: { value: 'Hello there' } })

    fireEvent.click(screen.getByRole('button', { name: 'Send' }))

    await waitFor(() => {
      expect(fetchMock).toHaveBeenCalledWith(
        'https://formspree.io/f/xjkrarpl',
        expect.objectContaining({ method: 'POST' })
      )
      expect(screen.getByText('Thank you! Your message has been sent.')).toBeInTheDocument()
    })
  })
})