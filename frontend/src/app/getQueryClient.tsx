// initialData : 서버 컴포넌트에서 데이터 prefetch 및 클라이언트 컴포넌트로 initialData prop 를 전달하는 방법

// 간단한 케이스에 대한 신속한 설정이 가능.
// 다만, 클라이언트 컴포넌트의 여러 계층에 걸친 drilling 이 필요할 수 있습니다.
// 동일한 쿼리를 사용하여 여러 클라이언트 컴포넌트에 prop drill 이 필요할 수 있습니다.
// 쿼리 refetching는 데이터가 서버에서 prefetch 된 시간 대신 페이지가 로드되는 시간을 기준으로 합니다.
// <Hydrate> : 서버에서 쿼리를 prefetch 하고 캐시를 dehydrate 한 후, <Hydrate> 로 클라이언트에게 rehydrate 해줍니다.

// initialData 에 비해 더 많은 설정이 요구됩니다.
// 대신에 prop drill 이 필요없습니다.
// 쿼리 refetch는 쿼리가 서버에서 prefetch 된 시간을 기준으로 합니다
// 저는 이 중에서 Hydrate 방식을 사용하도록 하겠습니다. 보통 권장하기로는 <Hydrate> 를 사용하는게 일반적인거 같습니다.

// Using <Hydrate>
// QueryClient의 request-scoped 싱글톤 인스턴스를 만듭니다. 이렇게 하면 서로 다른 사용자 요청 간에 데이터가 공유되지 않고 요청당 한 번만 쿼리 클라이언트를 만들 수 있습니다.

import { QueryClient } from '@tanstack/react-query'
import { cache } from 'react'

const getQueryClient = cache(() => new QueryClient())
export default getQueryClient
