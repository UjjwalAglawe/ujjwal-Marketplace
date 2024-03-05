import { useEffect } from "react";
import { useState } from "react";
import Spinner  from "../components/Spinner";
import Product from '../components/Product'

const Home = ({posts, loading}) => {

  return (
    <div className="bg-gradient-to-b from-slate-600 to-slate-300">
      {
        loading ? <Spinner /> :
          posts.length > 0 ?
            (
              <div className="grid  xs:gridcols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 max-w-6xl p-2 mx-auto space-y-10 space-x-5 min-h-[80vh]">
                {
                  posts.map((post) => (
                    <Product key={posts.id} post={post} />
                  ))}
              </div>
            ) :
            <div className="flex justify-center items-center">No Data</div>
      }
    </div>
  )
}

export default Home