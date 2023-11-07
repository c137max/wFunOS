import dynamic from "next/dynamic";


const TestPage = dynamic(() => import('@/app/test/TestP'), {
  loading: () => <p>Loading...</p>
})
const TestPage2 = dynamic(() => import('@/app/test/TestP2'), {
  loading: () => <p>Loading...</p>
})

export {TestPage, TestPage2}
