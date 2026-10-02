'use client'

import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { getNotes } from '@/lib/api'
import Link from 'next/link'
import Pagination from '@/components/Pagination/Pagination' // Шлях до вашого новоствореного компонента

const NotesPage = () => {
  // 1. Стан для поточної сторінки (починаємо з 1)
  const [page, setPage] = useState(1)
  const limit = 10 // Кількість нотаток на сторінці

  // 2. Отримання даних через TanStack Query з урахуванням сторінки
  const { data, isLoading, isError } = useQuery({
    queryKey: ['notes', page],
    queryFn: () => getNotes(page, limit),
    placeholderData: (previousData) => previousData, // Плавне перемикання без зайвого мерехтіння
  })

  if (isLoading) return <p>Завантаження нотаток...</p>
  if (isError) return <p>Помилка завантаження даних.</p>

  // 3. Обчислюємо загальну кількість сторінок на основі total з бекенда
  const totalPages = data ? Math.ceil(data.total / limit) : 1

  return (
    <div>
      <h1>Список нотаток {data.total}</h1>

      {/* Список нотаток */}
      <ul>
        {data?.notes.map((note) => (
          <li key={note.id}>
            <Link href={`/notes/${note.id}`}>{note.title}</Link>
          </li>
        ))}
      </ul>

      {/* 4. Підключаємо наш універсальний компонент пагінації */}
      <Pagination
        pageCount={totalPages}
        currentPage={page}
        onPageChange={(newPage) => setPage(newPage)}
      />
    </div>
  )
}

export default NotesPage