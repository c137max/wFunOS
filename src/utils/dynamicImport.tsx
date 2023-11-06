import dynamic from "next/dynamic";


let TestPage = dynamic(() => import('@/app/test/TestP'), {
  loading: () => <p>Loading...</p>
})

export {TestPage}
