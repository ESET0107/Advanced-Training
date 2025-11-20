import { useTranslation } from "react-i18next";

export default function Sidebar() {
  const { t } = useTranslation();

  return (
    <aside className="w-64 bg-gray-50 dark:bg-gray-800 h-full p-4">
      <ul className="space-y-2">
        <li className="hover:bg-gray-200 dark:hover:bg-gray-700 p-2 rounded">
          {t("home")}
        </li>
        <li className="hover:bg-gray-200 dark:hover:bg-gray-700 p-2 rounded">
          {t("dashboard")}
        </li>
      </ul>
    </aside>
  );
}
