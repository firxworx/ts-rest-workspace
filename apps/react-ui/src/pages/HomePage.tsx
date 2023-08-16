import { Posts } from '../components/Posts'

export function HomePage(): JSX.Element {
  return (
    <>
      <h1 className="text-4xl tracking-tight font-bold mb-8">Home</h1>
      <p>Hello world&hellip;</p>
      <h2 className="text-2xl tracking-tight font-semibold py-6 sm:py-8">Blog Posts</h2>
      <Posts />
    </>
  )
}
