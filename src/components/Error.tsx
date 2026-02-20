import type { PropsWithChildren } from "react"


export default function Error({children}:PropsWithChildren) {
  return (
    <div className="text-center my-4 p-3 uppercase rounded-lg bg-red-600 text-white font-bold">{children}</div>
  )
}
