import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'

import L from 'leaflet'
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png'
import markerIcon from 'leaflet/dist/images/marker-icon.png'
import markerShadow from 'leaflet/dist/images/marker-shadow.png'

L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
})

export default function App() {
  const [step, setStep] = useState(1)
  const [imageFile, setImageFile] = useState(null)
  const [imagePreview, setImagePreview] = useState(null)
  const [description, setDescription] = useState('')
  const [coords, setCoords] = useState(null)
  const [price, setPrice] = useState('150000')
  const [rooms, setRooms] = useState(3)

  useEffect(() => {
    if (!imageFile) { setImagePreview(null); return }
    const reader = new FileReader()
    reader.onload = (e) => setImagePreview(e.target.result)
    reader.readAsDataURL(imageFile)
  }, [imageFile])

  function handleFileChange(e) {
    const f = e.target.files?.[0]
    if (f) setImageFile(f)
  }

  function canGoNext() {
    if (step === 1) return imageFile || description.trim().length > 0
    if (step === 2) return !!coords
    return true
  }
  function next() { if (!canGoNext()) return; setStep((s)=>Math.min(4,s+1)) }
  function back() { setStep((s)=>Math.max(1,s-1)) }

  function handleConfirmAndSearch() {
    const data = {
      descripcion: description,
      archivo_imagen: imageFile ? imageFile.name : 'N/A',
      detalles: {
        ubicacion: coords ? coords.map((c) => c.toFixed(5)).join(', ') : '—',
        precio_maximo: price,
        habitaciones_minimas: rooms,
      },
    }
    console.log('Datos de la consulta:', JSON.stringify(data, null, 2))
  }

  function LocationPicker() {
    useMapEvents({ click(e){ setCoords([e.latlng.lat, e.latlng.lng]) } })
    return null
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="w-full max-w-4xl bg-white rounded-2xl shadow-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl sm:text-3xl font-extrabold">Encuentra la casa que imaginas</h1>
          <div className="text-sm text-slate-500">Paso {step} / 4</div>
        </div>

        <AnimatePresence mode="wait" initial={false}>
          {step === 1 && (
            <motion.div key="step1" initial={{ opacity:0, y:10 }} animate={{ opacity:1, y:0 }} exit={{ opacity:0, y:-10 }} transition={{ duration:0.25 }}>
              <p className="mb-4 text-slate-600">Sube una imagen de referencia y escribe lo que buscas (opcional, pero recomendado).</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block mb-2 text-sm font-medium">Subir imagen</label>
                  <input type="file" accept="image/*" onChange={handleFileChange} />
                  {imagePreview ? (
                    <img src={imagePreview} alt="preview" className="mt-4 w-full rounded-md shadow-sm object-cover h-48" />
                  ) : (
                    <div className="mt-4 h-48 rounded-md border border-dashed border-slate-200 flex items-center justify-center text-slate-400">Vista previa</div>
                  )}
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium">Describe lo que buscas</label>
                  <textarea value={description} onChange={(e)=>setDescription(e.target.value)} rows={6} className="w-full p-3 border rounded-md" placeholder="Ej: Escazú, moderno, 3 habitaciones, jardín"></textarea>
                </div>
              </div>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div key="step2" initial={{ opacity:0, y:10 }} animate={{ opacity:1, y:0 }} exit={{ opacity:0, y:-10 }} transition={{ duration:0.25 }}>
              <p className="mb-4 text-slate-600">Haz clic en el mapa para seleccionar la ubicación deseada.</p>
              <div className="h-80 rounded-md overflow-hidden border">
                <MapContainer center={[9.9281, -84.0907]} zoom={12} style={{ height: '100%', width: '100%' }}>
                  <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                  <LocationPicker />
                  {coords && <Marker position={coords} />}
                </MapContainer>
              </div>
              <div className="mt-3 text-sm text-slate-600">Coordenadas: {coords ? coords.map((c)=>c.toFixed(5)).join(', ') : 'No seleccionado'}</div>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div key="step3" initial={{ opacity:0, y:10 }} animate={{ opacity:1, y:0 }} exit={{ opacity:0, y:-10 }} transition={{ duration:0.25 }}>
              <p className="mb-4 text-slate-600">Ajusta filtros rápidos antes de ver la confirmación.</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block mb-2 text-sm font-medium">Precio máximo (USD)</label>
                  <input type="number" value={price} onChange={(e)=>setPrice(e.target.value)} className="w-full p-3 border rounded-md" />
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium">Habitaciones mínimas</label>
                  <input type="number" min={1} value={rooms} onChange={(e)=>setRooms(Number(e.target.value))} className="w-full p-3 border rounded-md" />
                </div>
              </div>
            </motion.div>
          )}

          {step === 4 && (
            <motion.div key="step4" initial={{ opacity:0, y:10 }} animate={{ opacity:1, y:0 }} exit={{ opacity:0, y:-10 }} transition={{ duration:0.25 }}>
              <p className="mb-4 text-slate-600">Resumen — revisa y confirma.</p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="md:col-span-2">
                  <div className="bg-slate-50 p-4 rounded-md">
                    <h3 className="font-semibold mb-2">Descripción</h3>
                    <p className="text-slate-700">{description || '—'}</p>

                    <h3 className="font-semibold mt-4 mb-2">Imagen de referencia</h3>
                    {imagePreview ? (
                      <img src={imagePreview} alt="preview" className="rounded-md w-full object-cover h-48" />
                    ) : (
                      <div className="h-48 rounded-md border border-dashed border-slate-200 flex items-center justify-center text-slate-400">Sin imagen</div>
                    )}
                  </div>
                </div>

                <div>
                  <div className="bg-slate-50 p-4 rounded-md">
                    <h4 className="font-semibold">Detalles</h4>
                    <ul className="mt-2 text-slate-700 space-y-1">
                      <li><strong>Ubicación:</strong> {coords ? coords.map((c)=>c.toFixed(5)).join(', ') : '—'}</li>
                      <li><strong>Precio máximo:</strong> ${price}</li>
                      <li><strong>Habitaciones mínimas:</strong> {rooms}</li>
                    </ul>
                    <button onClick={handleConfirmAndSearch} className="mt-4 w-full bg-emerald-600 text-white py-2 rounded-md hover:bg-emerald-700">Confirmar y Buscar</button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="mt-6 flex items-center justify-between">
          <div>
            <button onClick={back} disabled={step===1} className="px-4 py-2 rounded-md border mr-2 disabled:opacity-40">Atrás</button>
            <button onClick={next} disabled={!canGoNext()} className="px-4 py-2 rounded-md bg-sky-600 text-white disabled:opacity-40">{step < 4 ? 'Siguiente' : 'Volver'}</button>
          </div>

          <div className="text-sm text-slate-500">Consejo: sube una imagen y haz click en el mapa para mejores resultados.</div>
        </div>
      </div>
    </div>
  )
}