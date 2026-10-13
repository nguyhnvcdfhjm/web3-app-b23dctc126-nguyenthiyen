import Identicon from 'react-identicons'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { truncate, useGlobalState, daysRemaining } from '../store'
import { payoutBeneficiary } from '../Blockchain.services'
import { toast } from 'react-toastify'

const Proposals = () => {
  const [data] = useGlobalState('proposals')
  const [proposals, setProposals] = useState(data)

  const deactive = `bg-transparent text-blue-600 font-medium text-xs leading-tight uppercase
    hover:bg-blue-700 focus:bg-blue-700 focus:outline-none focus:ring-0 active:bg-blue-600
    transition duration-150 ease-in-out overflow-hidden border border-blue-600
    hover:text-white focus:text-white`
  const active = `bg-blue-600 text-white font-medium text-xs leading-tight uppercase
    hover:bg-blue-700 focus:bg-blue-700 focus:outline-none focus:ring-0 active:bg-blue-800
    transition duration-150 ease-in-out overflow-hidden border border-blue-600`

  const isExpired = (p) => new Date().getTime() > Number(p.duration + '000')

  const getAll = () => setProposals(data)
  const getOpened = () => setProposals(data.filter((p) => !isExpired(p)))
  const getClosed = () => setProposals(data.filter((p) => isExpired(p)))

  const handlePayout = async (id) => {
    await payoutBeneficiary(id)
    toast.success('Beneficiary successfully Paid Out!')
  }

  const pill = (color) => `dark:border rounded-full px-6 py-2.5 dark:border-${color}-600
    dark:text-${color}-600 dark:bg-transparent font-medium text-xs leading-tight uppercase
    transition duration-150 ease-in-out text-white bg-${color}-600`

  return (
    <div className="flex flex-col p-8">
      <div className="flex flex-row justify-center items-center" role="group">
        <button className={`rounded-l-full px-6 py-2.5 ${active}`} onClick={getAll}>All</button>
        <button className={`px-6 py-2.5 ${deactive}`} onClick={getOpened}>Open</button>
        <button className={`rounded-r-full px-6 py-2.5 ${deactive}`} onClick={getClosed}>Closed</button>
      </div>

      <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
          <div className="h-[calc(100vh_-_20rem)] overflow-y-auto shadow-md rounded-md">
            <table className="min-w-full">
              <thead className="border-b dark:border-gray-500">
                <tr>
                  {['Created By', 'Title', 'Expires', 'Action'].map((h) => (
                    <th key={h} scope="col" className="text-sm font-medium px-6 py-4 text-left">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {proposals.map((proposal) => (
                  <tr key={proposal.id} className="border-b dark:border-gray-500">
                    <td className="text-sm font-light px-6 py-4 whitespace-nowrap">
                      <div className="flex flex-row justify-start items-center space-x-3">
                        <Identicon
                          string={proposal.proposer.toLowerCase()}
                          size={25}
                          className="h-10 w-10 object-contain rounded-full mr-3"
                        />
                        <span>{truncate(proposal.proposer, 4, 4, 11)}</span>
                      </div>
                    </td>
                    <td className="text-sm font-light px-6 py-4 whitespace-nowrap">
                      {proposal.title.length > 80
                        ? proposal.title.substring(0, 80) + '...'
                        : proposal.title}
                    </td>
                    <td className="text-sm font-light px-6 py-4 whitespace-nowrap">
                      {isExpired(proposal) ? 'Expired' : daysRemaining(proposal.duration)}
                    </td>
                    <td className="flex justify-start items-center space-x-3 text-sm font-light px-6 py-4 whitespace-nowrap">
                      <Link to={'/proposal/' + proposal.id} className={pill('blue')}>
                        View
                      </Link>

                      {isExpired(proposal) ? (
                        proposal.upvotes > proposal.downvotes ? (
                          !proposal.paid ? (
                            <button className={pill('red')} onClick={() => handlePayout(proposal.id)}>
                              Payout
                            </button>
                          ) : (
                            <button className={pill('green')}>Paid</button>
                          )
                        ) : (
                          <button className={pill('red')}>Rejected</button>
                        )
                      ) : null}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Proposals