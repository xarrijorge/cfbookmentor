import { render, screen } from '@testing-library/react'
import App from './App'
import Date from './components/dates'

test('renders calendar', () => {
    const component = render(<Date />)
    const element = document.querySelector('.react-calendar')

    expect(component.container).toContain(element)
})
