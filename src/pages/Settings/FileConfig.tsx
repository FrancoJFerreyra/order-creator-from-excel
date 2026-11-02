import { useEffect, useMemo, useState } from 'react'
import { useConfigStore } from '@/infraestructure/store/configStore'
import { saveAppConfig } from '@/infraestructure/tauri/config'
import { getHeaders } from '@/infraestructure/tauri/commands'
import type { ColumnHeader } from '@/types/FileConfig'
import FormSelect from '@/components/form/FormSelect'

type Field = 'referenceColumn' | 'nameColumn'

const toOption = (header: ColumnHeader) => ({
  label: header.name,
  value: String(header.index),
})

const FileConfig = () => {
  const config = useConfigStore((state) => state.config)
  const setConfig = useConfigStore((state) => state.setConfig)
  const [headers, setHeaders] = useState<ColumnHeader[]>([])

  const catalog = config.catalog

  const referenceOptions = useMemo(
    () =>
      headers
        .filter((header) => header.index !== catalog?.nameColumn)
        .map(toOption),
    [headers, catalog?.nameColumn],
  )

  const nameOptions = useMemo(
    () =>
      headers
        .filter((header) => header.index !== catalog?.referenceColumn)
        .map(toOption),
    [headers, catalog?.referenceColumn],
  )

  const assign = async (field: Field, value: string) => {
    if (!catalog) return

    const nextConfig = {
      ...config,
      catalog: { ...catalog, [field]: Number(value) },
    }

    setConfig(nextConfig)
    await saveAppConfig(nextConfig)
  }

  useEffect(() => {
    setHeaders([])

    if (!catalog?.filePath || !catalog.sheetName) return

    let active = true

    getHeaders({
      filePath: catalog.filePath,
      sheetName: catalog.sheetName,
      headerRow: catalog.headerRow,
    })
      .then((result) => active && setHeaders(result))
      .catch(() => active && setHeaders([]))

    return () => {
      active = false
    }
  }, [catalog?.filePath, catalog?.sheetName, catalog?.headerRow])

  if (!catalog?.filePath) {
    return (
      <div className="flex h-full items-center justify-center border-2 border-dashed border-ui-primary/30 rounded-md p-8">
        <p className="text-center text-muted-foreground">
          Selecciona un archivo primero para asociar sus columnas
        </p>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-4">
      <FormSelect
        label="Referencia"
        name="referenceColumn"
        options={referenceOptions}
        value={String(catalog.referenceColumn)}
        onValueChange={(value) => assign('referenceColumn', value)}
      />
      <FormSelect
        label="Nombre"
        name="nameColumn"
        options={nameOptions}
        value={String(catalog.nameColumn)}
        onValueChange={(value) => assign('nameColumn', value)}
      />
    </div>
  )
}

export default FileConfig
