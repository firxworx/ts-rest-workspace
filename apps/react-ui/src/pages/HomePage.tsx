import { Posts } from '../components/Posts'

export function HomePage(): JSX.Element {
  return (
    <>
      <h1 className="mb-8 text-4xl font-bold tracking-tight">Home</h1>
      <p>Hello world&hellip;</p>
      <h2 className="py-6 text-2xl font-semibold tracking-tight sm:py-8">Blog Posts</h2>
      <Posts />
    </>
  )
}
