import Link from 'next/link'

const Header = () => {
  return (
    <div>
      <div className="Home__navbar">
        <Link href={'/BoxShadow'}>
          <a className="HomeLink">Box-shadow</a>
        </Link>
        <Link href={'/TextShadow'}>
          <a className="HomeLink">Text-shadow</a>
        </Link>
        <Link href={'/Border'}>
          <a className="HomeLink">Border</a>
        </Link>
        <Link href={'/Transform'}>
          <a className="HomeLink">Transform</a>
        </Link>
        <Link href={'/Gradient'}>
          <a className="HomeLink">Gradient</a>
        </Link>
      </div>
    </div>
  )
}

export default Header
