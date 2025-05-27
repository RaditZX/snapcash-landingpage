import {
  ChatBubbleBottomCenterTextIcon,
  ClockIcon,
  ChartBarIcon,
  TruckIcon,
  QrCodeIcon,
  TableCellsIcon,
} from "@heroicons/react/24/solid";

export const featuresData = [
  {
    color: "blue",
    title: "Scan Invoice Otomatis",
    icon: QrCodeIcon,
    description:
      "Scan struk atau invoice yang Anda miliki untuk mencatat pengeluaran atau pemasukan secara otomatis. Anda cukup memotret atau mengunggah struk/invoice, dan SnapCash akan secara otomatis mengambil informasi penting untuk catatan keuangan anda.",
  },
  {
    color: "blue",
    title: "Dashboard Analitik",
    icon: ChartBarIcon,
    description:
      "Pantau dan analisis pengeluaran Anda dengan mudah melalui dashboard yang intuitif. Fitur ini memberikan gambaran jelas tentang keuangan Anda, membantu Anda membuat keputusan yang lebih baik.",
  },
  {
    color: "blue",
    title: "Export Data",
    icon: TableCellsIcon,
    description:
      "Ekspor data keuangan Anda dalam format yang mudah dibaca, seperti PDF. Fitur ini memungkinkan Anda untuk menyimpan catatan keuangan Anda dengan aman dan membagikannya dengan pihak lain jika diperlukan.",
  },
];

export default featuresData;
