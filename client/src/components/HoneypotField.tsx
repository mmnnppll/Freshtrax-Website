/*
 * Spam trap. Real visitors never see or reach this input: it sits off-screen,
 * is skipped by keyboard and screen readers, and is excluded from autofill.
 * Bots that fill every input populate it, and the lead endpoints drop those
 * submissions (see netlify/functions/utils/lead-helpers.js).
 */
interface HoneypotFieldProps {
  value: string;
  onChange: (value: string) => void;
}

export default function HoneypotField({ value, onChange }: HoneypotFieldProps) {
  return (
    <div
      aria-hidden="true"
      style={{ position: "absolute", left: "-10000px", width: 1, height: 1, overflow: "hidden" }}
    >
      <label>
        Leave this field empty
        <input
          type="text"
          name="website"
          tabIndex={-1}
          autoComplete="off"
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
      </label>
    </div>
  );
}
