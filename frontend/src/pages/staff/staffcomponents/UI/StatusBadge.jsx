

const baseClasses = "px-2 py-1 rounded-md text-xs font-medium flex items-center gap-1";

export default function StatusBadge({ status, color }) {
  let classNames = baseClasses;

  switch (color) {
    case 'green':
      classNames += " bg-green-100 text-green-700 border border-green-200";
      break;
    case 'blue':
      classNames += " bg-blue-100 text-blue-700 border border-blue-200";
      break;
    case 'yellow':
      classNames += " bg-yellow-100 text-yellow-700 border border-yellow-200";
      break;
    default:
      classNames += " bg-gray-100 text-gray-700 border border-gray-200";
  }

  const icon = color === 'yellow' ? '📝' : '✓';

  return (
    <span className={classNames}>
      <span>{icon}</span>
      {status}
    </span>
  );
}
