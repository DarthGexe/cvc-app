"use client"

import { useState, useMemo } from 'react'
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"

const TableData = ({ table }) => {
  const [selectedContinent, setSelectedContinent] = useState('all')
  const [isDownloading, setIsDownloading] = useState(false)

  const filteredTable = useMemo(() => {
    return selectedContinent === 'all'
      ? table
      : table.filter(tbl => tbl.continent === selectedContinent)
  }, [table, selectedContinent])

  const downloadCSV = async () => {
    setIsDownloading(true)
    const csvContent = [
      'Rank,Player,Cont,Lvl,Power,CVC Points\n',
      ...filteredTable.map((tbl) => `${tbl.rank},${tbl.name},${tbl.continent},${tbl.level},${tbl.power},${tbl.point}\n`)
    ].join('')
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8' })
    const url = window.URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = 'data.csv'
    link.click()
    window.URL.revokeObjectURL(url)
    setIsDownloading(false)
  }

  const chartData = useMemo(() => {
    return filteredTable.map(tbl => ({
      name: tbl.name,
      points: tbl.point
    }))
  }, [filteredTable])

  return (
    <div className="flex flex-col md:flex-row gap-4 p-4">
      <div className="w-full md:w-1/2">
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={chartData} layout="vertical" margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <XAxis type="number" />
            <YAxis dataKey="name" type="category" width={150} />
            <Tooltip />
            <Bar dataKey="points" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      </div>
      <div className="w-full md:w-1/2">
        <div className="flex justify-between items-center mb-4">
          <Select onValueChange={setSelectedContinent} defaultValue={selectedContinent}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select continent" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Continents</SelectItem>
              {Array.from(new Set(table.map(tbl => tbl.continent))).map(continent => (
                <SelectItem key={continent} value={continent}>{continent}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button
            onClick={downloadCSV}
            disabled={isDownloading}
            variant={isDownloading ? "secondary" : "default"}
          >
            {isDownloading ? 'Downloading...' : 'Download this data'}
          </Button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-primary text-primary-foreground">
                <th className="p-2">Rank</th>
                <th className="p-2">Player</th>
                <th className="p-2">Cont</th>
                <th className="p-2">Lvl</th>
                <th className="p-2">Power</th>
                <th className="p-2">CVC Points</th>
              </tr>
            </thead>
            <tbody>
              {filteredTable.map((tbl) => (
                <tr key={tbl.name} className="border-b border-primary">
                  <td className="p-2">{tbl.rank}</td>
                  <td className="p-2">{tbl.name}</td>
                  <td className="p-2">{tbl.continent}</td>
                  <td className="p-2">{tbl.level}</td>
                  <td className="p-2">{tbl.power}</td>
                  <td className="p-2">{tbl.point}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default TableData
