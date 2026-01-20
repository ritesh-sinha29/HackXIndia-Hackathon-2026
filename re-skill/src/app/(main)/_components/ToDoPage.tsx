"use client";

import { useState } from "react";
import { X, Palette } from "lucide-react";

export default function ToDoPage() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [bgColor, setBgColor] = useState("bg-white");
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  const colors = [
    { name: "White", class: "bg-white", border: "border-gray-300" },
    { name: "Red", class: "bg-red-100", border: "border-red-200" },
    { name: "Orange", class: "bg-orange-100", border: "border-orange-200" },
    { name: "Yellow", class: "bg-yellow-100", border: "border-yellow-200" },
    { name: "Green", class: "bg-green-100", border: "border-green-200" },
  ];

  const handleClear = () => {
    if (title || content) {
      if (window.confirm("Clear this note?")) {
        setTitle("");
        setContent("");
      }
    }
  };

  const handleExpand = () => {
    setIsExpanded(true);
  };

  const handleClose = () => {
    setIsExpanded(false);
  };

  const selectedColor = colors.find((c) => c.class === bgColor) || colors[0];

  return (
    <div className=" flex justify-end bg-gray-50 relative">
      {/* Backdrop overlay when expanded */}
      {isExpanded && (
        <div
          className="fixed inset-0 bg-black/30 z-40 transition-opacity duration-300"
          onClick={handleClose}
        />
      )}

      {/* Note container */}
      <div
        className={`${
          isExpanded
            ? "fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[45vw] h-[70vh] z-50"
            : "w-[270px] h-[360px] my-4"
        } rounded-lg shadow border ${
          selectedColor.border
        } ${bgColor} flex flex-col  transition-all duration-200 ease-in-out`}
        onClick={!isExpanded ? handleExpand : undefined}
        style={{ cursor: !isExpanded ? "pointer" : "default" }}
      >
        {/* Header */}
        <div className="w-full flex justify-center -mt-2.5">
          <div className="relative w-6 h-6 bg-red-500 rounded-full shadow-[0_4px_10px_rgba(0,0,0,0.4)] border border-yellow-700">
            <div className="absolute top-1 left-1 w-2 h-2 bg-red-300 rounded-full opacity-70"></div>
          </div>
        </div>

        <div className="p-4 pb-2 flex justify-between items-start ">
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            onClick={(e) => {
              e.stopPropagation();
              if (!isExpanded) handleExpand();
            }}
            className={`flex-1 text-lg font-semibold outline-none ${bgColor} placeholder-gray-500`}
          />
          <button
            onClick={(e) => {
              e.stopPropagation();
              if (isExpanded) {
                handleClose();
              } else {
                handleClear();
              }
            }}
            className="p-1 hover:bg-gray-200 rounded-full transition-colors"
            title={isExpanded ? "Close" : "Clear note"}
          >
            <X size={20} className="text-black" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 px-4 pb-4 overflow-hidden text-black">
          <textarea
            placeholder="Take a note..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            onClick={(e) => {
              e.stopPropagation();
              if (!isExpanded) handleExpand();
            }}
            className={`w-full h-full resize-none outline-none ${bgColor} placeholder-gray-400 text-sm`}
          />
        </div>

        {/* Footer */}
        <div className="p-3 border-t border-gray-200 flex items-center justify-between">
          <div className="relative">
            <button
              onClick={(e) => {
                e.stopPropagation();
                setShowColorPicker(!showColorPicker);
              }}
              className="p-2 hover:bg-gray-200 rounded-full transition-colors"
              title="Change color"
            >
              <Palette size={18} className="text-gray-600" />
            </button>

            {/* Color Picker Dropdown */}
            {showColorPicker && (
              <div className="absolute bottom-full left-0 mb-5 p-2 pr-11 bg-white rounded-lg shadow-xl border border-gray-200 grid grid-cols-5 gap-10 z-50">
                {colors.map((color) => (
                  <button
                    key={color.name}
                    onClick={(e) => {
                      e.stopPropagation();
                      setBgColor(color.class);
                      setShowColorPicker(false);
                    }}
                    className={`w-8 h-8 rounded-full ${color.class} border-2 ${
                      bgColor === color.class
                        ? "border-gray-800"
                        : "border-gray-300"
                    } hover:border-gray-500 transition-colors`}
                    title={color.name}
                  />
                ))}
              </div>
            )}
          </div>

          <div className="text-xs text-gray-500">
            {content.length} characters
          </div>
        </div>
      </div>
    </div>
  );
}
