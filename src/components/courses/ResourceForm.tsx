import React from 'react';
import { useFormik } from 'formik';

import * as Yup from 'yup';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import { ActivityIndicator, TextInput } from '../UI';
import { patchCourse } from '../../services/api.service';
import { extractErrorMessage } from '../../common/helpers';
import { Course, Resource } from '../../types/api.types';
import { ResourceTypes } from '../../common/constants';

type Props = {
  course?: Course;
  handleUpdateCourse: (updatedCourse: Course) => void;
};

const ResourceForm: React.FC<Props> = ({ course, handleUpdateCourse }) => {
  const { t } = useTranslation();

  const formik = useFormik({
    initialValues: {
      text: '',
      url: '',
      type: 'link',
    },
    validationSchema: Yup.object().shape({
      text: Yup.string().required(),
      url: Yup.string()
        .matches(
          /((https?):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/,
          'Please enter a valid  URL'
        )
        .required(),
    }),
    onSubmit: async (values: Resource) => {
      const resources = course?.resources || [];
      try {
        resources.push(values);
        const data = await patchCourse({ resources }, course?.id || -1);
        handleUpdateCourse(data);
      } catch (e) {
        const message = extractErrorMessage(e);
        toast.error(message);
      }
    },
  });
  const { touched, errors, getFieldProps } = formik;
  return (
    <div className="w-full">
      <div className="py-4 px-6">
        <form onSubmit={formik.handleSubmit}>
          <select
            className="w-full py-2 px-4 bg-gray-100 text-gray-700 border border-gray-300 rounded  block appearance-none placeholder-gray-500 focus:outline-none focus:bg-white"
            {...getFieldProps('type')}
          >
            {ResourceTypes.map(item => (
              <option key={item}>{item}</option>
            ))}
          </select>
          <TextInput
            label={t('title')}
            placeholder={t('title')}
            {...getFieldProps('text')}
            error={(touched.text && errors.text && errors.text) || ''}
          />

          <TextInput
            label={t('url')}
            placeholder="https://youtube.com?watch=1sAw2asd"
            {...getFieldProps('url')}
            error={(touched.url && errors.url && errors.url) || ''}
          />

          <div className="flex justify-between items-center mt-6">
            <ActivityIndicator active={formik.isSubmitting}>
              <button
                className="py-2 px-4 bg-gray-700 text-white rounded hover:bg-gray-600 focus:outline-none"
                type="submit"
              >
                {t('save')}
              </button>
            </ActivityIndicator>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ResourceForm;
