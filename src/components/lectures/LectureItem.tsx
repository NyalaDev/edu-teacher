import { useRef } from 'react';
import { FaTrash } from 'react-icons/fa';
import { useDrag, useDrop, DropTargetMonitor } from 'react-dnd';
import { XYCoord } from 'dnd-core';
import { Clickable } from '../UI';
import { Lecture } from '../../types/api.types';
import { formatDuration } from '../../common/helpers';
import {
  StyledLectureListItem,
  StyledCount,
  StyledListBody,
  StyledVideoIcon,
  StyledDuration,
} from './LecturesList/styles';

type LectureItemProps = {
  lecture: Lecture;
  handleDelete: () => void;
  index: number;
  moveCard: (dragIndex: number, hoverIndex: number) => void;
  id: number;
  handlePreview: (lecture: Lecture) => void;
};

interface DragItem {
  index: number;
  id: number;
  type: string;
}

const LectureItem: React.FC<LectureItemProps> = ({
  lecture,
  handleDelete,
  index,
  moveCard,
  id,
  handlePreview,
}) => {
  const ref = useRef<HTMLLIElement>(null);

  const [{ handlerId }, drop] = useDrop({
    accept: 'card',
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      };
    },
    hover(item: DragItem, monitor: DropTargetMonitor) {
      if (!ref.current) {
        return;
      }

      const dragIndex = item.index;
      const hoverIndex = index;

      // Don't replace items with themselves
      if (dragIndex === hoverIndex) {
        return;
      }

      // Determine rectangle on screen
      const hoverBoundingRect = ref.current?.getBoundingClientRect();

      // Get vertical middle
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

      // Determine mouse position
      const clientOffset = monitor.getClientOffset();

      // Get pixels to the top
      const hoverClientY = (clientOffset as XYCoord).y - hoverBoundingRect.top;

      // Only perform the move when the mouse has crossed half of the items height
      // When dragging downwards, only move when the cursor is below 50%
      // When dragging upwards, only move when the cursor is above 50%

      // Dragging downwards
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }

      // Dragging upwards
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }

      // Time to actually perform the action
      moveCard(dragIndex, hoverIndex);

      // Note: we're mutating the monitor item here!
      // Generally it's better to avoid mutations,
      // but it's good here for the sake of performance
      // to avoid expensive index searches.
      // eslint-disable-next-line no-param-reassign
      item.index = hoverIndex;
    },
  });

  const [{ isDragging }, drag] = useDrag({
    type: 'card',
    item: () => {
      return { id, index };
    },
    collect: monitor => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const opacity = isDragging ? 0 : 1;
  drag(drop(ref));

  return (
    <StyledLectureListItem
      ref={ref}
      style={{ opacity }}
      data-handler-id={handlerId}
      className="m-3 border-2"
    >
      <StyledCount>
        <div className="flex justify-center items-center h-full">
          <Clickable onClick={handleDelete}>
            <FaTrash />
          </Clickable>
        </div>
      </StyledCount>
      <StyledListBody>
        <StyledVideoIcon />

        <Clickable onClick={() => handlePreview(lecture)}>
          {lecture.title}
        </Clickable>
        <StyledDuration>{formatDuration(lecture.duration)}</StyledDuration>
      </StyledListBody>
    </StyledLectureListItem>
  );
};

export default LectureItem;
