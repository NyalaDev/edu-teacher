import React from 'react';
import { toast } from 'react-toastify';
import { AutoCompleteInput, Badge } from '../UI';
import { AutoCompleteOption } from '../UI/AutoCompleteInput';
import { patchCourse } from '../../services/api.service';
import { Course, Tag } from '../../types/api.types';
import { extractErrorMessage } from '../../common/helpers';

type Props = {
  courseTags: Tag[];
  allTags: Tag[];
  courseId: number | undefined;
  handleUpdateCourse: (updatedCourse: Course) => void;
};

const CourseTags: React.FC<Props> = ({
  courseTags,
  allTags,
  courseId,
  handleUpdateCourse,
}) => {
  const onRemoveTag = async (tag: Tag) => {
    const updatedTags = courseTags?.filter((aTag: Tag) => aTag.id !== tag.id);
    try {
      const data = await patchCourse({ tags: updatedTags }, courseId || -1);
      handleUpdateCourse(data);
    } catch (e) {
      const message = extractErrorMessage(e);
      toast.error(message);
    }
  };

  const onAddTag = async (tag: AutoCompleteOption) => {
    try {
      const updatedTags = courseTags?.map((aTag: Tag) => aTag.id);
      if (!updatedTags?.includes(tag.id)) {
        const y = allTags?.filter((atag: Tag) => tag.id === atag.id)[0];
        courseTags?.push(y);
        const data = await patchCourse({ tags: courseTags }, courseId || -1);
        handleUpdateCourse(data);
      }
    } catch (e) {
      const message = extractErrorMessage(e);
      toast.error(message);
    }
  };
  return (
    <div className="w-full flex flex-col mt-5 bg-white rounded-lg shadow-md overflow-hidden p-2">
      <div className="flex flex-wrap">
        {courseTags?.map((tag: Tag) => (
          <Badge
            key={tag.id}
            color="purple-500"
            text={tag.tagName}
            closable
            onClose={() => onRemoveTag(tag)}
          />
        ))}
      </div>
      <AutoCompleteInput
        name="tag"
        placeholder="Tag course"
        options={allTags?.map((tag: Tag) => ({
          id: tag.id,
          name: tag.tagName,
        }))}
        onOptionSelect={(tag: AutoCompleteOption) => onAddTag(tag)}
      />
    </div>
  );
};

export default CourseTags;
