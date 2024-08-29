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

  const rankedFilteredTable = useMemo(() => {
    return filteredTable.map((item, index) => ({
      ...item,
      currentRank: index + 1
    }))
  }, [filteredTable])

  const downloadCSV = async () => {
    setIsDownloading(true)
    const csvContent = [
      'Rank,Player,Cont,Lvl,Power,CVC Points\n',
      ...rankedFilteredTable.map((tbl) => `${tbl.currentRank},${tbl.name},${tbl.continent},${tbl.level},${tbl.power},${tbl.point}\n`)
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
    return rankedFilteredTable.map(tbl => ({
      name: tbl.name,
      points: tbl.point
    }))
  }, [rankedFilteredTable])

  const calculateChartHeight = () => {
    const chartHeight = chartData.length * 30;
    return chartHeight;
  }
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="custom-tooltip bg-secondary text-secondary-foreground">
          <p className="label">{`${label} : ${payload[0].value}`} Points</p>
        </div>
      );
    }

  return null;

  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <div className="w-full">
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
              {rankedFilteredTable.map((tbl) => (
                <tr key={tbl.name} className="border-b border-primary">
                  <td className="p-2">{tbl.currentRank}</td>
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
      <div className="w-full">
          <ResponsiveContainer width="100%" height={calculateChartHeight()}>
          <BarChart data={chartData} layout="vertical" margin={{ top: 5, right: 30, left: 100, bottom: 5 }}>
            <XAxis type="number" />
            <YAxis dataKey="name" type="category" width={150} tick={{ fontSize: 14 }} />
            <Tooltip content={<CustomTooltip />} />
            <Bar dataKey="points" fill="hsl(var(--primary))" />
          </BarChart>
        </ResponsiveContainer>

      </div>

    </div>
  )
}

export default TableData
