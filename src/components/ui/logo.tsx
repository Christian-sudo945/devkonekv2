export function Logo() {
  return (
    <div className="flex items-center">
      <svg viewBox="0 0 200 50" className="h-8 md:h-10">
        <rect
          x="5"
          y="10"
          width="30"
          height="30"
          fill="currentColor"
          className="text-blue-600 dark:text-blue-400"
          rx="2"
        />
        <rect
          x="8"
          y="13"
          width="24"
          height="24"
          fill="currentColor"
          className="text-blue-700 dark:text-blue-500"
          rx="1"
        />
        <g fill="currentColor" className="text-blue-200 dark:text-blue-300">
          {[16, 20, 24, 28].map((y) =>
            [11, 15, 19, 23].map((x) => (
              <rect key={`${x}-${y}`} x={x} y={y} width="2" height="2" />
            ))
          )}
        </g>
        <text
          x="50"
          y="33"
          className="text-xl font-bold text-blue-600 dark:text-blue-400"
          fill="currentColor"
        >
          DevKonek
        </text>
      </svg>
    </div>
  );
}
