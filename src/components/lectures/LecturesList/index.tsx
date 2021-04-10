import { useState } from 'react';
import { FaTrash, FaPlus, FaSyncAlt } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { orderBy } from 'lodash';
import { Clickable, Modal } from '../../UI';
import LectureFrorm from '../LectureFrorm';
import ImportLecturesForm from '../ImportLecturesForm';
import { Course, Lecture } from '../../../types/api.types';
import { extractErrorMessage, formatDuration } from '../../../common/helpers';

import {
  StyledLectureList,
  StyledLectureListItem,
  StyledCount,
  StyledListBody,
  StyledVideoIcon,
  StyledDuration,
} from './styles';
import { deleteLecture } from '../../../services/api.service';

type LecturesListProps = {
  course: Course;
  refreshData: () => void;
};

type ModalStatusType = {
  open: boolean;
  type: '' | 'single' | 'import';
};

const initialLectureState = {} as Lecture;

const LecturesList: React.FC<LecturesListProps> = ({ course, refreshData }) => {
  const { t } = useTranslation();
  const [modalStatus, setModalStatus] = useState<ModalStatusType>({
    open: false,
    type: '',
  });

  const [lectureForDelete, setLectureForDelete] = useState(initialLectureState);

  const { lectures = [] } = course;

  const handlePreview = (lecture: Lecture) => {
    const { url = '' } = lecture;
    window.open(url, '', 'width=600,height=600');
  };

  const handleDelete = async () => {
    try {
      await deleteLecture(lectureForDelete.id);
      setLectureForDelete(initialLectureState);
      refreshData();
    } catch (e) {
      const message = extractErrorMessage(e);
      toast.error(message);
    }
  };

  const onNewLectureSaved = () => {
    setModalStatus({ open: false, type: '' });
    refreshData();
  };

  const onModalDimiss = () => {
    setModalStatus({ open: false, type: '' });
  };

  return (
    <div className="bg-white w-full rounded-lg shadow-md overflow-hidden mx-auto">
      <div className="py-4 px-6">
        <div className="mb-8 flex justify-evenly">
          <button
            onClick={() => setModalStatus({ open: true, type: 'single' })}
            className="py-2 px-4 bg-red-500 text-white rounded hover:bg-gray-600 focus:outline-none flex items-center"
            type="button"
          >
            <FaPlus />
            <span className="mx-1">{t('addLecture')}</span>
          </button>
          <button
            onClick={() => setModalStatus({ open: true, type: 'import' })}
            className="py-2 px-4 bg-blue-500 text-white rounded hover:bg-gray-600 focus:outline-none flex items-center"
            type="button"
          >
            <FaSyncAlt />
            <span className="mx-1">{t('importFromYoutube')}</span>
          </button>
        </div>
        <h1 className="text-3xl  text-gray-800 font-extrabold ">
          {t('lectures')}
        </h1>
        <hr />
        <StyledLectureList>
          {orderBy(lectures, 'position', 'asc').map(lecture => (
            <StyledLectureListItem key={lecture.id}>
              <StyledCount>
                <div className="flex justify-center items-center h-full">
                  <Clickable onClick={() => setLectureForDelete(lecture)}>
                    <FaTrash />
                  </Clickable>
                </div>
              </StyledCount>
              <StyledListBody>
                <StyledVideoIcon />

                <Clickable onClick={() => handlePreview(lecture)}>
                  {lecture.title}
                </Clickable>
                <StyledDuration>
                  {formatDuration(lecture.duration)}
                </StyledDuration>
              </StyledListBody>
            </StyledLectureListItem>
          ))}
        </StyledLectureList>
      </div>

      {modalStatus.open && (
        <Modal
          sizeLarge
          onDismiss={onModalDimiss}
          title={t(
            modalStatus.type === 'single'
              ? 'lectureDetail'
              : 'importFromYoutube'
          )}
        >
          {modalStatus.type === 'single' && (
            <LectureFrorm course={course} onSaveComplete={onNewLectureSaved} />
          )}

          {modalStatus.type === 'import' && (
            <ImportLecturesForm
              onSaveComplete={onNewLectureSaved}
              course={course}
            />
          )}
        </Modal>
      )}

      {lectureForDelete.id && (
        <Modal
          onDismiss={() => setLectureForDelete(initialLectureState)}
          title={t('deleteLecture')}
          confirmLabel={t('delete')}
          onAction={handleDelete}
          withActions
        >
          <p className="p-3">{t('confirmDelete', { entity: t('lecture') })}</p>
        </Modal>
      )}
    </div>
  );
};

export default LecturesList;
