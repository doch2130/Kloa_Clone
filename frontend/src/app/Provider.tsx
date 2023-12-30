'use client'
import React from 'react'
import { QueryClientProvider, QueryClient } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

type ProvidersType = {
  children: React.ReactNode;
};

function Providers({ children }: ProvidersType) {
  const [client] = React.useState(
    new QueryClient({  
      defaultOptions: {  // react-query 전역 설정
        queries: {
          refetchOnWindowFocus: false,
          retry: false,
        },
      },
    })
  );

  return (
    <QueryClientProvider client={client}>
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default Providers;


// import { HydrationBoundary, QueryClient, QueryClientProvider } from '@tanstack/react-query'

// export default function MyApp({ Component, pageProps }) {
//   const [queryClient] = React.useState(() => new QueryClient())

//   return (
//     <QueryClientProvider client={queryClient}>
//       <HydrationBoundary state={pageProps.dehydratedState}>
//         <Component {...pageProps} />
//       </HydrationBoundary>
//     </QueryClientProvider>
//   )
// }