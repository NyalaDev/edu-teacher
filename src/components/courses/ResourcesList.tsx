import React, { useState } from 'react';

import { useTranslation } from 'react-i18next';
import { FaTrash, FaPlus } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { uniqueId } from 'lodash';
import {
  ActivityIndicator,
  TextInput,
  AutoCompleteInput,
  Clickable,
  Modal,
} from '../UI';
import { patchCourse } from '../../services/api.service';
import ResourceForm from './ResourceForm';

import { extractErrorMessage } from '../../common/helpers';

const ResourcesList = ({ course, handleUpdateCourse }) => {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const [deleteIndex, setDeleteIndex] = useState(-1);
  const resources = course.resources || [];
  console.log(resources, 'res');
  const handleDelete = async () => {
    try {
      resources.splice(deleteIndex, 1);
      const data = await patchCourse({ resources }, course.id);
      handleUpdateCourse(data);
      setDeleteIndex(-1);
    } catch (e) {
      const message = extractErrorMessage(e);
      toast.error(message);
    }
  };

  const onNewLectureSaved = () => {
    setOpen(false);
    onSaveSuccess();
  };

  return (
    <div className="bg-white w-full rounded-lg shadow-md overflow-hidden mx-auto">
      <div className="py-4 px-6">
        <div className="mb-8">
          <button
            onClick={() => setOpen(true)}
            className="py-2 px-4 bg-green-500 text-white rounded hover:bg-gray-600 focus:outline-none flex justify-between items-center"
            type="button"
          >
            <FaPlus size={10} />
            <span>{t('add')}</span>
          </button>
        </div>
        <h1 className="text-3xl  text-gray-800 font-extrabold ">
          {t('resources')}
        </h1>
        <hr />
        <ul className="list-none mt-3">
          {resources.map((resource, index) => (
            <li key={uniqueId('resource-')} className="flex h-20 mb-2 ">
              <div className="bg-gray-300 w-10 h-full flex justify-center items-center">
                <div>
                  <Clickable onClick={() => setDeleteIndex(index)}>
                    <FaTrash />
                  </Clickable>
                </div>
              </div>
              <div className="bg-gray-200 w-full pl-7 flex justify-center flex-col">
                <div> {resource.text}</div>
                <div className="text-gray-500">{resource.url}</div>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {open && (
        <Modal
          withActions={false}
          onDismiss={() => setOpen(false)}
          title={t('details')}
        >
          <ResourceForm
            handleUpdateCourse={handleUpdateCourse}
            course={course}
          />
        </Modal>
      )}

      {deleteIndex > -1 && (
        <Modal
          onDismiss={() => setDeleteIndex(-1)}
          title={t('delete')}
          confirmLabel={t('delete')}
          closeLabel={t('close')}
          onAction={handleDelete}
          withActions
        >
          <p className="p-3">
            {t('confirmDelete', { entity: t('resources') })}
          </p>
        </Modal>
      )}
    </div>
  );
};

export default ResourcesList;
