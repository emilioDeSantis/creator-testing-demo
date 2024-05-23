"use client";
import React, { useEffect, useState } from "react";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Option, Answer, Question } from "@/app/types";

interface RankingInputProps {
  question: Question;
  answer: Answer;
  handleRankingChange: (questionId: string, rankedOptionIds: string[]) => void;
}

const SortableItem: React.FC<{ id: string; index: number; label: string }> = ({
  id,
  index,
  label,
}) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
    padding: "0.5rem",
    margin: "0.5rem 0",
    backgroundColor: "#fff",
    border: "1px solid #ccc",
    borderRadius: "4px",
    cursor: "move",
    display: "flex",
    alignItems: "center",
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <div
        style={{
          marginRight: "0.5rem",
          fontWeight: "bold",
          fontSize: "1.2rem",
          color: "#555",
        }}
      >
        {index + 1}
      </div>
      <div style={{ flexGrow: 1 }}>{label}</div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-end",
          marginLeft: "auto",
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 4px)",
            gridTemplateRows: "repeat(2, 4px)",
            gap: "2px",
          }}
        >
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              style={{
                width: "4px",
                height: "4px",
                backgroundColor: "#888",
                borderRadius: "50%",
              }}
            ></div>
          ))}
        </div>
      </div>
    </div>
  );
};

const shuffleArray = (array: Option[]): Option[] => {
  return array
    .map((value) => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value);
};

const RankingInput: React.FC<RankingInputProps> = ({
  question,
  answer,
  handleRankingChange,
}) => {
  const [rankedOptions, setRankedOptions] = useState<string[]>(
    answer ? answer.optionIds : question.options.map((opt) => opt.id)
  );

  useEffect(() => {
    if (question.parameters?.randomize) {
      const shuffledOptions = shuffleArray(
        question.options
      ).map((option) => option.id);
      setRankedOptions(shuffledOptions);
    }
  }, [question]);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event: any) => {
    const { active, over } = event;
    if (active.id !== over.id) {
      const oldIndex = rankedOptions.indexOf(active.id);
      const newIndex = rankedOptions.indexOf(over.id);
      const newRankedOptions = arrayMove(rankedOptions, oldIndex, newIndex);
      setRankedOptions(newRankedOptions);
      handleRankingChange(question.id, newRankedOptions);
    }
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <div
        style={{
          color: "green",
          marginBottom: "1rem",
          fontSize: "0.9rem",
          textAlign: "center",
        }}
      >
        Drag and drop to rank options
      </div>
      <SortableContext items={rankedOptions} strategy={verticalListSortingStrategy}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "0.5rem",
            paddingInline: "2rem",
            marginTop: "1rem",
          }}
        >
          {rankedOptions.map((optionId, index) => {
            const option = question.options.find((opt) => opt.id === optionId);
            return (
              <SortableItem
                key={optionId}
                id={optionId}
                index={index}
                label={option ? option.label : ""}
              />
            );
          })}
        </div>
      </SortableContext>
    </DndContext>
  );
};

export default RankingInput;
