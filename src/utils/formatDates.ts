export function formatDatesToDisplay(date: string | Date) {


    const newDate = Intl.DateTimeFormat('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: '2-digit'
    }).format(new Date(date))

    return newDate
}