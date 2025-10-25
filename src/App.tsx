import React, { useEffect, useState } from 'react'
import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'
import { Button } from 'primereact/button'
import { ProgressSpinner } from 'primereact/progressspinner'
import axios from 'axios'
import type { Artwork } from './components/types'

const App: React.FC = () => {
  const [artworks, setArtworks] = useState<Artwork[]>([])
  const [totalRecords, setTotalRecords] = useState<number>(0)
  const [page, setPage] = useState<number>(1)
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)

  // Persistent selections across reloads
  const [selectedRowsMap, setSelectedRowsMap] = useState<Record<string, Artwork>>(() => {
    const saved = localStorage.getItem('selectedRowsMap')
    if (saved) {
      try {
        const parsed = JSON.parse(saved)
        if (parsed && typeof parsed === 'object') return parsed
      } catch {
        console.warn('Error parsing saved selections')
      }
    }
    return {}
  })

  const rowsPerPage = 10

  const fetchArtworks = async (pageNum: number) => {
    setLoading(true)
    setError(null)
    try {
      const res = await axios.get(
        `https://api.artic.edu/api/v1/artworks?page=${pageNum}&limit=${rowsPerPage}`
      )
      const data = res.data.data.map((item: any) => ({
        id: item.id,
        title: item.title,
        place_of_origin: item.place_of_origin,
        artist_display: item.artist_display,
        inscriptions: item.inscriptions,
        date_start: item.date_start,
        date_end: item.date_end,
      }))
      setArtworks(data)
      setTotalRecords(res.data.pagination.total)
    } catch (err) {
      console.error(err)
      setError('Failed to load data. Please check your connection or try again later.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchArtworks(page)
  }, [page])

  useEffect(() => {
    localStorage.setItem('selectedRowsMap', JSON.stringify(selectedRowsMap))
  }, [selectedRowsMap])

  const handlePageChange = (event: any) => {
    setPage(event.first / event.rows + 1)
  }

  const handleSelectionChange = (currentPageSelection: Artwork[]) => {
    const updatedMap = { ...selectedRowsMap }
    artworks.forEach((row) => {
      if (currentPageSelection.some((r) => r.id === row.id)) {
        updatedMap[String(row.id)] = row
      } else {
        delete updatedMap[String(row.id)]
      }
    })
    setSelectedRowsMap(updatedMap)
  }

  const currentPageSelectedRows = artworks.filter((row) => selectedRowsMap[String(row.id)])

  const removeFromSelection = (id: number) => {
    const updatedMap = { ...selectedRowsMap }
    delete updatedMap[String(id)]
    setSelectedRowsMap(updatedMap)
  }

  const handleSelectAll = () => {
    const updatedMap = { ...selectedRowsMap }
    artworks.forEach((row) => (updatedMap[String(row.id)] = row))
    setSelectedRowsMap(updatedMap)
  }

  const handleDeselectAll = () => {
    const updatedMap = { ...selectedRowsMap }
    artworks.forEach((row) => delete updatedMap[String(row.id)])
    setSelectedRowsMap(updatedMap)
  }

  // ✅ CSV Export Functionality
  const handleExportCSV = (selectedOnly: boolean = false) => {
    const exportData = selectedOnly
      ? Object.values(selectedRowsMap)
      : artworks.length
      ? artworks
      : []
    if (!exportData.length) {
      alert('No data available to export!')
      return
    }

    const csvHeaders = Object.keys(exportData[0]).join(',')
    const csvRows = exportData.map((row) =>
      Object.values(row)
        .map((v) => `"${(v ?? '').toString().replace(/"/g, '""')}"`)
        .join(',')
    )
    const csvContent = [csvHeaders, ...csvRows].join('\n')
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.setAttribute('download', selectedOnly ? 'selected_artworks.csv' : 'artworks.csv')
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
  }

  return (
    <div className="p-4">
      <h1 className="mb-4">Art Institute of Chicago Artworks</h1>

      {loading && (
        <div className="flex align-items-center justify-content-center my-5">
          <ProgressSpinner />
          <p className="ml-2">Loading data, please wait...</p>
        </div>
      )}

      {error && (
        <div className="p-3 border-round bg-red-100 text-red-700 mb-4">
          {error}
          <Button
            label="Retry"
            icon="pi pi-refresh"
            className="p-button-text p-button-danger ml-3"
            onClick={() => fetchArtworks(page)}
          />
        </div>
      )}

      {!loading && !error && (
        <>
          {/* Control buttons */}
          <div className="flex gap-2 mb-3 flex-wrap">
            <Button
              label="Select All (This Page)"
              icon="pi pi-check-square"
              onClick={handleSelectAll}
              className="p-button-success p-button-sm"
            />
            <Button
              label="Deselect All (This Page)"
              icon="pi pi-minus-circle"
              onClick={handleDeselectAll}
              className="p-button-warning p-button-sm"
            />
            <Button
              label="Export Selected CSV"
              icon="pi pi-file"
              onClick={() => handleExportCSV(true)}
              className="p-button-info p-button-sm"
            />
            <Button
              label="Export All CSV"
              icon="pi pi-download"
              onClick={() => handleExportCSV(false)}
              className="p-button-secondary p-button-sm"
            />
          </div>

          <DataTable
            value={artworks}
            selectionMode="checkbox"
            selection={currentPageSelectedRows}
            onSelectionChange={(e) => handleSelectionChange(e.value)}
            paginator
            rows={rowsPerPage}
            totalRecords={totalRecords}
            lazy
            onPage={handlePageChange}
            dataKey="id"
            responsiveLayout="scroll"
            first={(page - 1) * rowsPerPage}
          >
            <Column selectionMode="multiple" headerStyle={{ width: '3em' }}></Column>
            <Column field="title" header="Title"></Column>
            <Column field="artist_display" header="Artist"></Column>
            <Column field="place_of_origin" header="Origin"></Column>
            <Column field="inscriptions" header="Inscriptions"></Column>
            <Column field="date_start" header="Start Year"></Column>
            <Column field="date_end" header="End Year"></Column>
          </DataTable>

          {/* Selection panel */}
          {Object.keys(selectedRowsMap).length > 0 && (
            <div className="mt-4 border-1 surface-border rounded-lg shadow-2 p-3">
              <h3 className="mb-3">
                Selected Artworks ({Object.keys(selectedRowsMap).length})
              </h3>
              <ul>
                {Object.values(selectedRowsMap).map((art) => (
                  <li
                    key={art.id}
                    className="flex justify-content-between align-items-center mb-2"
                  >
                    {art.title} - {art.artist_display}
                    <Button
                      icon="pi pi-times"
                      className="p-button-rounded p-button-danger p-button-text p-button-sm"
                      onClick={() => removeFromSelection(art.id)}
                    />
                  </li>
                ))}
              </ul>
            </div>
          )}
        </>
      )}
    </div>
  )
}

export default App
