"use client";

import { useRef, useCallback, useEffect, useState } from "react";
import { cn } from "@cloudflare/kumo";

export interface Segment {
  id: string;
  label: string;
  maxLength: number;
  type: "numeric" | "alpha" | "alphanumeric";
  placeholder: string;
  hint?: string;
  color?: string; // tailwind color class for the accent
}

interface SegmentedInputProps {
  segments: Segment[];
  value: string;
  onChange: (value: string) => void;
  onComplete?: (value: string) => void;
  className?: string;
}

export function SegmentedInput({
  segments,
  value,
  onChange,
  onComplete,
  className,
}: SegmentedInputProps) {
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const [focusedIndex, setFocusedIndex] = useState<number | null>(null);
  const [glowRect, setGlowRect] = useState<{
    left: number;
    top: number;
    width: number;
    height: number;
  } | null>(null);

  const totalLength = segments.reduce((sum, s) => sum + s.maxLength, 0);

  // Split the combined value into per-segment values
  const segmentValues = getSegmentValues(value, segments);

  function getSegmentValues(val: string, segs: Segment[]): string[] {
    const result: string[] = [];
    let offset = 0;
    for (const seg of segs) {
      result.push(val.slice(offset, offset + seg.maxLength));
      offset += seg.maxLength;
    }
    return result;
  }

  // Combine segment values back into a single string
  function combineValues(segVals: string[]): string {
    return segVals.join("");
  }

  // Filter input based on segment type
  function filterInput(text: string, type: Segment["type"]): string {
    switch (type) {
      case "numeric":
        return text.replace(/\D/g, "");
      case "alpha":
        return text.replace(/[^a-zA-Z]/g, "").toUpperCase();
      case "alphanumeric":
        return text.replace(/[^a-zA-Z0-9]/g, "").toUpperCase();
      default:
        return text;
    }
  }

  // Update glow position to track focused input
  const updateGlow = useCallback(
    (index: number | null) => {
      if (index === null || !containerRef.current) {
        setGlowRect(null);
        return;
      }
      const input = inputRefs.current[index];
      if (!input || !containerRef.current) {
        setGlowRect(null);
        return;
      }
      const containerRect = containerRef.current.getBoundingClientRect();
      const inputRect = input.getBoundingClientRect();
      setGlowRect({
        left: inputRect.left - containerRect.left,
        top: inputRect.top - containerRect.top,
        width: inputRect.width,
        height: inputRect.height,
      });
    },
    []
  );

  useEffect(() => {
    updateGlow(focusedIndex);
  }, [focusedIndex, updateGlow]);

  // Also update on resize
  useEffect(() => {
    const handleResize = () => updateGlow(focusedIndex);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [focusedIndex, updateGlow]);

  const handleInput = useCallback(
    (index: number, inputValue: string) => {
      const segment = segments[index];
      const filtered = filterInput(inputValue, segment.type);
      const capped = filtered.slice(0, segment.maxLength);

      const newSegVals = [...segmentValues];
      newSegVals[index] = capped;
      const combined = combineValues(newSegVals);
      onChange(combined);

      // Auto-advance to next segment when current is full
      if (capped.length >= segment.maxLength && index < segments.length - 1) {
        const nextInput = inputRefs.current[index + 1];
        if (nextInput) {
          // Small delay to let state update first
          requestAnimationFrame(() => {
            nextInput.focus();
            nextInput.setSelectionRange(0, 0);
          });
        }
      }

      // Check if complete
      const totalFilled = combined.replace(/\s/g, "").length;
      if (totalFilled >= totalLength && onComplete) {
        onComplete(combined);
      }
    },
    [segments, segmentValues, onChange, onComplete, totalLength]
  );

  const handleKeyDown = useCallback(
    (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
      const input = inputRefs.current[index];
      if (!input) return;

      // Backspace at start → go to previous segment
      if (
        e.key === "Backspace" &&
        input.selectionStart === 0 &&
        input.selectionEnd === 0 &&
        index > 0
      ) {
        e.preventDefault();
        const prevInput = inputRefs.current[index - 1];
        if (prevInput) {
          prevInput.focus();
          const len = prevInput.value.length;
          prevInput.setSelectionRange(len, len);
        }
      }

      // ArrowLeft at start → go to previous segment
      if (e.key === "ArrowLeft" && input.selectionStart === 0 && index > 0) {
        e.preventDefault();
        const prevInput = inputRefs.current[index - 1];
        if (prevInput) {
          prevInput.focus();
          const len = prevInput.value.length;
          prevInput.setSelectionRange(len, len);
        }
      }

      // ArrowRight at end → go to next segment
      if (
        e.key === "ArrowRight" &&
        input.selectionStart === input.value.length &&
        index < segments.length - 1
      ) {
        e.preventDefault();
        const nextInput = inputRefs.current[index + 1];
        if (nextInput) {
          nextInput.focus();
          nextInput.setSelectionRange(0, 0);
        }
      }
    },
    [segments.length]
  );

  // Handle paste — distribute across segments
  const handlePaste = useCallback(
    (index: number, e: React.ClipboardEvent<HTMLInputElement>) => {
      e.preventDefault();
      const pasted = e.clipboardData.getData("text").replace(/\s/g, "");

      // If pasting what looks like a full value, distribute from segment 0
      const startIndex = pasted.length >= totalLength * 0.8 ? 0 : index;

      const newSegVals = [...segmentValues];
      let remaining = pasted;

      for (let i = startIndex; i < segments.length && remaining.length > 0; i++) {
        const seg = segments[i];
        const chunk = remaining.slice(0, seg.maxLength);
        const filtered = filterInput(chunk, seg.type);
        newSegVals[i] = filtered;
        remaining = remaining.slice(seg.maxLength);
      }

      const combined = combineValues(newSegVals);
      onChange(combined);

      // Focus last segment with content or the next empty one
      requestAnimationFrame(() => {
        let focusIdx = segments.length - 1;
        for (let i = startIndex; i < segments.length; i++) {
          if (newSegVals[i].length < segments[i].maxLength) {
            focusIdx = i;
            break;
          }
        }
        const targetInput = inputRefs.current[focusIdx];
        if (targetInput) {
          targetInput.focus();
          const len = targetInput.value.length;
          targetInput.setSelectionRange(len, len);
        }
      });
    },
    [segments, segmentValues, onChange, totalLength]
  );

  const handleFocus = useCallback(
    (index: number) => {
      setFocusedIndex(index);
    },
    []
  );

  const handleBlur = useCallback(() => {
    // Delay to check if focus moved to another segment
    requestAnimationFrame(() => {
      if (containerRef.current && !containerRef.current.contains(document.activeElement)) {
        setFocusedIndex(null);
      }
    });
  }, []);

  return (
    <div
      ref={containerRef}
      className={cn(
        "segmented-input-container relative flex flex-wrap items-start gap-2",
        className
      )}
    >
      {/* Sliding glow indicator */}
      {glowRect && (
        <div
          className="segment-glow pointer-events-none absolute z-0 rounded-xl"
          style={{
            left: glowRect.left - 3,
            top: glowRect.top - 3,
            width: glowRect.width + 6,
            height: glowRect.height + 6,
            transition: "all 200ms cubic-bezier(0.4, 0, 0.2, 1)",
          }}
        />
      )}

      {segments.map((segment, index) => {
        const segValue = segmentValues[index] || "";
        const isFocused = focusedIndex === index;
        const isFilled = segValue.length >= segment.maxLength;

        return (
          <div key={segment.id} className="segment-wrapper relative z-10 flex flex-col items-center gap-1.5">
            {/* Dot separator (not on first) */}
            {index > 0 && (
              <div className="segment-dot absolute -left-[7px] top-[20px] h-1.5 w-1.5 rounded-full bg-kumo-subtle/40" />
            )}

            <input
              ref={(el) => { inputRefs.current[index] = el; }}
              type="text"
              inputMode={segment.type === "numeric" ? "numeric" : "text"}
              maxLength={segment.maxLength}
              placeholder={segment.placeholder}
              value={segValue}
              onChange={(e) => handleInput(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              onPaste={(e) => handlePaste(index, e)}
              onFocus={() => handleFocus(index)}
              onBlur={handleBlur}
              className={cn(
                "segment-input font-mono text-center transition-all duration-200",
                "rounded-xl border bg-kumo-surface text-kumo-text",
                "placeholder:text-kumo-subtle/30",
                "focus:outline-none",
                isFocused
                  ? "border-kumo-brand shadow-sm"
                  : isFilled
                    ? "border-kumo-border/80"
                    : "border-kumo-border/50",
                // Dynamic width based on maxLength
                segment.maxLength <= 1 && "w-11 h-11 text-lg",
                segment.maxLength === 2 && "w-14 h-11 text-lg",
                segment.maxLength === 3 && "w-16 h-11 text-base",
                segment.maxLength === 4 && "w-[4.5rem] h-11 text-base",
                segment.maxLength === 5 && "w-20 h-11 text-base",
                segment.maxLength === 6 && "w-24 h-11 text-base",
                segment.maxLength === 8 && "w-32 h-11 text-base"
              )}
              aria-label={segment.label}
            />

            <span
              className={cn(
                "segment-label text-[10px] font-medium tracking-wide transition-colors duration-200",
                isFocused
                  ? "text-kumo-brand"
                  : "text-kumo-subtle/70"
              )}
            >
              {segment.label}
            </span>
          </div>
        );
      })}
    </div>
  );
}
