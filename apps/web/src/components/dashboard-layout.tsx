import { Fragment } from 'react'
import { FiHome } from 'react-icons/fi'
import { Link, useLocation } from 'react-router-dom'

export default function DashboardLayout({
   children,
   title,
   description,
}: {
   children: React.ReactNode
   title: string
   description: string
}) {
   const location = useLocation()
   const path = location.pathname.split('/').filter((segment) => segment)

   return (
      <Fragment>
         <div className="px-5">
            <h2 className="text-3xl font-bold tracking-tight">{title}</h2>
            <p className="text-sm text-gray-600">{description}</p>
         </div>
         <div className="px-5 text-xs">
            <nav className="flex" aria-label="Breadcrumb">
               <ol className="flex space-x-2">
                  <li>
                     <Link to="/">
                        <FiHome />
                     </Link>
                  </li>
                  {path.map((segment, index) => {
                     const to = `/${path.slice(0, index + 1).join('/')}`

                     return (
                        <Fragment key={index}>
                           <li className="text-gray-400">/</li>
                           <li className="font-semibold">
                              <Link to={to}>
                                 {segment.replace(/-/g, '').toUpperCase()}
                              </Link>
                           </li>
                        </Fragment>
                     )
                  })}
               </ol>
            </nav>
         </div>
         {children}
      </Fragment>
   )
}
