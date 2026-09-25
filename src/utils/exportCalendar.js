/**
 * Genera y descarga un archivo .ics con todo el itinerario del viaje
 * compatible con Apple Calendar, Google Calendar, Outlook, etc.
 */
export function downloadIcsCalendar(daysList, baseYear = new Date().getFullYear() + 1) {
  let icsContent = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Viaje a Japon//ES",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    "X-WR-CALNAME:Viaje a Japón 🇯🇵",
    "X-WR-TIMEZONE:Asia/Tokyo"
  ];

  const nowStamp = new Date().toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";

  // Usamos fechas orientativas para exportar los 13 días correlativos
  const baseDate = new Date(baseYear, 8, 1); // 1 de septiembre del próximo año

  (daysList || []).forEach((day, index) => {
    const stageNum = day.num || index + 1;
    let startDate;

    if (day.date) {
      const parts = day.date.split("-").map(Number);
      startDate = new Date(parts[0], parts[1] - 1, parts[2]);
    } else {
      startDate = new Date(baseDate);
      startDate.setDate(baseDate.getDate() + (stageNum - 1));
    }

    const startYear = startDate.getFullYear();
    const startMonth = String(startDate.getMonth() + 1).padStart(2, "0");
    const startDay = String(startDate.getDate()).padStart(2, "0");
    const dateFormatted = `${startYear}${startMonth}${startDay}`;

    const endDate = new Date(startDate);
    endDate.setDate(endDate.getDate() + 1);
    const endYear = endDate.getFullYear();
    const endMonth = String(endDate.getMonth() + 1).padStart(2, "0");
    const endDay = String(endDate.getDate()).padStart(2, "0");
    const endDateFormatted = `${endYear}${endMonth}${endDay}`;

    const summary = `🇯🇵 Etapa ${stageNum}: ${day.title}`;
    const description = [
      `Etapa ${stageNum} - ${day.title}`,
      `Destino: ${day.cities || ""}`,
      day.summary ? day.summary.replace(/\n/g, " ") : "",
      "---",
      "Detalle de la ruta en la Guía de Viaje a Japón"
    ].join("\\n");

    icsContent.push("BEGIN:VEVENT");
    icsContent.push(`UID:japan-future-trip-day-${stageNum}@viaje-japon`);
    icsContent.push(`DTSTAMP:${nowStamp}`);
    icsContent.push(`DTSTART;VALUE=DATE:${dateFormatted}`);
    icsContent.push(`DTEND;VALUE=DATE:${endDateFormatted}`);
    icsContent.push(`SUMMARY:${summary}`);
    icsContent.push(`DESCRIPTION:${description}`);
    if (day.cities) {
      icsContent.push(`LOCATION:${day.cities}`);
    }
    icsContent.push("END:VEVENT");
  });

  icsContent.push("END:VCALENDAR");

  const blob = new Blob([icsContent.join("\r\n")], { type: "text/calendar;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.setAttribute("download", "viaje-japon-ruta-13-etapas.ics");
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
