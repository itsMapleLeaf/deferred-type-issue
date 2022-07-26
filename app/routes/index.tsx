import { deferred } from "@remix-run/node"
import { Deferred, useLoaderData } from "@remix-run/react"

export function loader() {
  return deferred({
    value: Math.random() > 0.5 ? Promise.resolve(123) : 123,
  })
}

export default function Page() {
  // @ts-expect-error: Type 'number | { readonly [toStringTag]: string; }' is not assignable to type 'number'.
  const data: { value: number } = useLoaderData<typeof loader>()
  return <Deferred value={data.value}>{(value) => <p>{value}</p>}</Deferred>
}
