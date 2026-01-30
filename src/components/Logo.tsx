import { Link } from 'react-router-dom'

export default function Logo() {
  return (
    <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
      <span className="font-serif text-2xl">
        <span className="font-bold">INK</span>
        <span className="font-normal">vert</span>
      </span>
    </Link>
  )
}
