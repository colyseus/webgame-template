import { useEffect, useState } from "react"
import { client } from "../core/Networking";

function Leaderboard() {
  const [isLoading, setIsLoading] = useState(true);
  const [leaderboardEntries, setLeaderboardEntries] = useState([] as any[]);

  useEffect(() => {
    client.http.get("/leaderboard").then((response) => {
      setIsLoading(false);
      setLeaderboardEntries(response.data);
    });
  }, []);

  return (
    <>
      <h2 className="mb-4 text-2xl font-semibold">Leaderboard</h2>

      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">#</th>
              <th scope="col" className="px-6 py-3">Name</th>
              <th scope="col" className="px-6 py-3">Score</th>
            </tr>
          </thead>
          <tbody>
          {(isLoading)
            ?  <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                <th colSpan={3} scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  Loading...
                </th>
              </tr>
            : (leaderboardEntries.map((entry, index) => (
                <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                  <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    {index + 1}
                  </th>
                  <td className="px-6 py-4">
                    {entry.name}
                  </td>
                  <td className="px-6 py-4">
                    {entry.score}
                  </td>
                </tr>
              )))}

          </tbody>
        </table>
      </div>

    </>
  )
}

export default Leaderboard
