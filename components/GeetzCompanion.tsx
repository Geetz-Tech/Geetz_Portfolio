export function GeetzCompanionMark() {
  return (
    <svg viewBox="0 0 72 84" fill="none" aria-hidden="true">
      <circle cx="36" cy="26" r="22.5" stroke="#9f74ff" strokeOpacity="0.18" strokeWidth="0.7" />
      <path
        d="M22 9h23.5L54 17.5V32q0 8.5-8 8.5H26Q18 40.5 18 32V17.5Q18 9 22 9Z"
        fill="#0b0912"
        stroke="#b286ff"
        strokeOpacity="0.58"
        strokeWidth="1.05"
      />
      <rect x="24" y="18.2" width="24" height="10" rx="5" fill="#05040a" />
      <g className="geetz-eyes">
        <rect x="27.4" y="21.2" width="6.1" height="3.5" rx="1.75" fill="#f3edff" />
        <rect x="38.5" y="21.2" width="6.1" height="3.5" rx="1.75" fill="#f3edff" />
      </g>
      <path d="M33.6 40.5v5.2h4.8v-5.2" fill="#121018" />
      <path
        d="M27 45.2q0-2.2 3-2.2h12q3 0 3 2.2V58q0 6.2-9 6.2T27 58Z"
        fill="#0b0912"
        stroke="#9f74ff"
        strokeOpacity="0.42"
        strokeWidth="1"
      />
      <circle className="geetz-core-glow" cx="36" cy="52.4" r="6.2" fill="#9f74ff" />
      <circle className="geetz-core" cx="36" cy="52.4" r="2.9" fill="#c4a7ff" />
      <path
        className="geetz-arm-l"
        d="M27 48.2 17.5 55.2"
        stroke="#c4a7ff"
        strokeOpacity="0.55"
        strokeWidth="1.35"
        strokeLinecap="round"
      />
      <g className="geetz-arm-r">
        <path
          d="M45 48.2 54.6 54.8"
          stroke="#c4a7ff"
          strokeOpacity="0.55"
          strokeWidth="1.35"
          strokeLinecap="round"
        />
      </g>
    </svg>
  );
}
